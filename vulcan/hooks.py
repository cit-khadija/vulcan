from . import __version__ as app_version

app_name = "vulcan"
app_title = "Vulcan"
app_publisher = "Craftinteractive LLC"
app_description = "Vulcan Customizations"
app_email = "support@craftinteractive.ae"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/vulcan/css/vulcan.css"
# app_include_js = "/assets/vulcan/js/vulcan.js"

# include js, css files in header of web template
# web_include_css = "/assets/vulcan/css/vulcan.css"
# web_include_js = "/assets/vulcan/js/vulcan.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "vulcan/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
doctype_js = {
    "Quotation" : "public/js/quotation.js",
    "Sales Order": "public/js/sales_order.js", 
    "Delivery Note": "public/js/delivery_note.js"
    }
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "vulcan.utils.jinja_methods",
#	"filters": "vulcan.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "vulcan.install.before_install"
# after_install = "vulcan.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "vulcan.uninstall.before_uninstall"
# after_uninstall = "vulcan.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "vulcan.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }
doc_events = {
    "Quotation": {
        "after_save": "vulcan.events.quotation.after_save_method"
    },
    # "Work Order": {
    #     "before_save": "vulcan.events.work_order.before_save_method"
    # }
}

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"vulcan.tasks.all"
#	],
#	"daily": [
#		"vulcan.tasks.daily"
#	],
#	"hourly": [
#		"vulcan.tasks.hourly"
#	],
#	"weekly": [
#		"vulcan.tasks.weekly"
#	],
#	"monthly": [
#		"vulcan.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "vulcan.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "vulcan.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "vulcan.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["vulcan.utils.before_request"]
# after_request = ["vulcan.utils.after_request"]

# Job Events
# ----------
# before_job = ["vulcan.utils.before_job"]
# after_job = ["vulcan.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"vulcan.auth.validate"
# ]

fixtures = [
    {
        "dt": "Custom Field", "filters": [
            ["name","in",[
                #Quotation
                "Quotation-hardware_set",
                "Quotation-hw_items",
                "Quotation-hw_set_data",
                "Quotation-hardware_set_summary",
                #Quotation Item
                "Quotation Item-hardware_set",
                #Sales Order
                "Sales Order-hardware_set",
                "Sales Order-hw_items",
                "Sales Order-hw_set_data",
                "Sales Order-hardware_set_summary",
                #Sales Order Item
                "Sales Order Item-hardware_set",
                #Delivery Note
                "Delivery Note-hw_items",
                "Delivery Note-hw_set_data",
                #Delivery Note Item
                "Delivery Note Item-is_hw_set_item",
                "Delivery Note Item-hardware_set",
                "Delivery Note Item-so_detail_ref" #CHECK TODO
            ]]
        ]
    }
]
