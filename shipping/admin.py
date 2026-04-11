from django.contrib import admin
from .models import Shipment, Waypoint, TrackingEvent, Facility, SupportTicket

# --- 1. INLINE PANELS (The Dispatcher UX Upgrade) ---
class WaypointInline(admin.TabularInline):
    model = Waypoint
    extra = 0  # Don't show empty extra rows
    readonly_fields = ('location_name', 'latitude', 'longitude', 'stop_number')
    can_delete = False
    classes = ['collapse'] # Allows the admin to collapse this section to save space

class TrackingEventInline(admin.TabularInline):
    model = TrackingEvent
    extra = 0
    readonly_fields = ('timestamp',)
    classes = ['collapse']

# --- 2. MAIN ADMIN DASHBOARDS ---
@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    # What columns show up on the main list page
    list_display = ('tracking_id', 'origin', 'destination', 'customer_email', 'total_distance')
    
    # Adds a search bar to look up packages instantly
    search_fields = ('tracking_id', 'customer_email', 'origin', 'destination')
    
    # Protects system-calculated fields from accidental human error
    readonly_fields = ('tracking_id', 'total_distance')
    
    # Embeds the Waypoints and Scan Events directly into the Shipment page
    inlines = [WaypointInline, TrackingEventInline]

@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ('name', 'latitude', 'longitude')
    search_fields = ('name',)

# --- 3. NEW: SUPPORT TICKET DASHBOARD ---
@admin.register(SupportTicket)
class SupportTicketAdmin(admin.ModelAdmin):
    list_display = ('shipment', 'customer_email', 'created_at', 'is_resolved')
    
    # Adds a clickable sidebar filter to quickly find Unresolved tickets
    list_filter = ('is_resolved', 'created_at') 
    
    # Allows dispatchers to search by email or the associated Tracking ID
    search_fields = ('customer_email', 'shipment__tracking_id')
    
    readonly_fields = ('created_at',)