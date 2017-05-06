

Images = new Mongo.Collection("images");
var big_image = "";

if (Meteor.isClient){
	
	Accounts.ui.config({
		passwordSignupFields: "USERNAME_AND_EMAIL"
	});


	
		Template.images.helpers({
		images:function(){
			
			if(Session.get("userFilter"))
			{
				 return Images.find({createdBy:Session.get("userFilter")}, {sort:{createdOn: -1, rating:-1}})
			} else {
				 	return Images.find({}, {sort:{createdOn: -1, rating:-1}})
			}
			
		},
		filtering_images:function(){
			if(Session.get("userFilter"))
			{
				return true;
			} else {
				return false;
			}
		},
		getFilterUser:function(){
			if(Session.get("userFilter"))
			{
				if(Meteor.users.findOne({_id:Session.get("userFilter")}))
				{
					var user = Meteor.users.findOne({_id:Session.get("userFilter")});
					return user.username;
				} else {
					return "anonymous";
				}
				
			} else {
				return false;
			}
		},
		getUser:function(user_id){  
			var user = Meteor.users.findOne({_id:user_id});  
			if (user){    return user.username;  
			} else { return "anonymous"; }
		}
	});
	


	Template.body.helpers({username:function(){
			if(Meteor.user()){
				return Meteor.user().username;
			}
			else{
				return "guest";
			}
		}
		});
	

	
}

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.images.events({
	'click .js-image':function(event){
		$("#image_big").modal('show');
		big_image = this.img_src;
		
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
		Images.update({_id:image_id}, {$set: {rating:rating}});
	},
	'click .js-show-image-form':function(event){
		$("#image_add_form").modal('show');
	},
	'click .js-set-image-filter':function(event){
		console.log(this.createdBy);
		Session.set("userFilter", this.createdBy);
	},
	'click .js-unset-image-filter':function(event){
		Session.set("userFilter", undefined);
	}
});



Template.image_add_form.events({
	'submit .js-add-image':function(event){
		var img_src, img_alt;
		img_src = event.target.img_src.value;
		img_alt = event.target.img_alt.value;
		
		if (Meteor.user()){
			Images.insert({
				img_src:img_src,
				img_alt: img_alt,
				createdOn: new Date(),
				createdBy: Meteor.user()._id
			});
		}
		
		event.target.img_src.value = "";
		event.target.img_alt.value = "";
		$("#image_add_form").modal('hide');
		return false;
	}
});

		