var API = {
	getEmployee: function(name) {
		var employee = new Object();
		employee.name = name;
		employee.age = 25;
		employee.deparment = "HR";
		employee.wage = 15000.00;	
		
		address = new Object();
		address.city = "Massachusetts";
		address.state = "Springfield";
		address.street = "Evergreen";
		address.zip = 66450;
		
		employee.address = address;
		return employee
	},
	createEmployee: function(data) {
		/* does nothing */
		return { "params": data }
	},
	createNamedEmployee: function(name, data) {
		/* does nothing */
		return { "name": name, "params": data }
	},
	deleteEmployee: function(name) {
		/* does nothing */
		return { "deleted": name }
	}
}

module.exports = API