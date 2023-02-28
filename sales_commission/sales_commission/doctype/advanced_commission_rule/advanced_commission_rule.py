# Copyright (c) 2023, Dexciss and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class AdvancedCommissionRule(Document):
	pass
def acr_calculation(self,method):
	dt_list = ["Sales Order","Sales Invoice","Delivery Note"]
	if self.doctype in dt_list:
		filters = {"applicable_doctype":self.doctype,"disable":0}
		fields = ["name"]
		acr_names = frappe.db.get_all("Advanced Commission Rule",filters,fields)
		if acr_names :
			for id in acr_names:
				acr = frappe.get_doc("Advanced Commission Rule",id.name)
				
				
	
	self.whitelisted_globals = {
				"int": int,
				"float": float,
				"long": int,
				"round": round,
			}
	#v=frappe.safe_eval(self.formula, self.whitelisted_globals,abbr_amount)
	print("sbbhusdnjivnsuvususd",self.acr_calculation)
		
			
