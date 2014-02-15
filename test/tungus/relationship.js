var tungus = require('tungus');
var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship");

/* test of M:N relationship */
mongoose.connect('tingodb://'+__dirname+'/data', function (err) {
  // if we failed to connect, abort
  if (err) throw err;

  // we connected ok
	var ParentSchema = new mongoose.Schema({
	    children:[{ type:Schema.ObjectId, ref:"Child" }]
	});
	var Parent = mongoose.model("Parent", ParentSchema);

	var ChildSchema = new mongoose.Schema({
	    parents: [{ type:Schema.ObjectId, ref:"Parent", childPath:"children" }]
	});
	ChildSchema.plugin(relationship, { relationshipPathName:'parents' });
	var Child = mongoose.model("Child", ChildSchema)

	var parent = new Parent({});
	parent.save();
	var parentTwo = new Parent({});
	parentTwo.save();

	var child = new Child({});
	child.parents.push(parent);
	child.parents.push(parentTwo);
	child.save() //both parent and parentTwo children property will now contain the child's id
	child.remove() //both parent and parentTwo children property will no longer contain the child's id 
 })



