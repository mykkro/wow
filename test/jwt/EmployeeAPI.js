var API = {
	employee: {
		get: function(id, next) {
			var employee = new Object();
			employee.id = 1
			employee.name = "Mykkro";
			employee.age = 25;
			employee.deparment = "HR";
			employee.wage = 15000.00;	
			
			address = new Object();
			address.city = "Massachusetts";
			address.state = "Springfield";
			address.street = "Evergreen";
			address.zip = 66450;
			
			employee.address = address;
			next(null, employee)
		},
		create: function(data, next) {
			/* does nothing */
			next(null, { "create": data })
		},
		update: function(id, data, next) {
			/* does nothing */			
			next(null, { "update": data })
		},
		delete: function(id, next) {
			/* does nothing */
			next(null, { "deletedId": id })
		}
	}
}

module.exports = API