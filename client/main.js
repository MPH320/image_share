Images = new Mongo.Collection("images");
var big_image = "";

if (Meteor.isClient){
	
	Template.images.helpers({images:
		Images.find({}, {sort:{createdOn: -1, rating:-1}})
	});
	
	console.log(Images.find().count());
	
}

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.images.events({
	'click .js-image':function(event){
		$("#image_big").modal('show');
		big_image = this.img_src;
		console.log(big_image)
		document.getElementById("big-image").src = big_image;
	},
	'click .js-del-image':function(event){
		var image_id = this._id;
		$("#"+image_id).hide('slow', function(){
			Images.remove({"_id":image_id});
		})
	},
	'click .js-rate-image':function(event){
		var rating = $(event.currentTarget).data("userrating");
		var image_id = this.id;
		console.log(event.currentTarget)
		Images.update({_id:image_id}, {$set: {rating:rating}});
	},
	'click .js-show-image-form':function(event){
		$("#image_add_form").modal('show');
	}
});



Template.image_add_form.events({
	'submit .js-add-image':function(event){
		var img_src, img_alt;
		img_src = event.target.img_src.value;
		img_alt = event.target.img_alt.value;
		
		Images.insert({
				img_src:img_src,
				img_alt: img_alt,
				createdOn: new Date()
		});
		event.target.img_src.value = "";
		event.target.img_alt.value = "";
		$("#image_add_form").modal('hide');
		return false;
	}
});