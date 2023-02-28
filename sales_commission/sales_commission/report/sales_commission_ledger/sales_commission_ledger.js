// Copyright (c) 2023, Dexciss and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Sales Commission Ledger"] = {
	"filters": [
		{
			"fieldname": "company",
			"label": "Company",
			"fieldtype": "Link",
			"options": "Company",

		},
		{
			"fieldname": "from_date",
			"label":"From Date",
			"fieldtype": "Date",
			
		},
		{
			"fieldname": "to_date",
			"label": "To Date",
			"fieldtype": "Date",
		},
		{
			"fieldname": "report_on",
			"label": "Report On",
			"fieldtype": "Select",
			"options": ["Sales Partner","Sales Person"]

		},
		{
			"fieldname": "group_by",
			"label": "Group By",
			"fieldtype": "Select",
			"options": ["Item","Territory","Customer"]
			
		},
		
	],
};
