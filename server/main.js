import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	
	Images = new Mongo.Collection("images");
	
	if (Images.find().count() ==0 ){
			
				for (var i = 1; i<9; i++) {
					Images.insert(
							 {
									img_src: "IMG_"+i+".JPG",
									img_alt: "Image number"+i,
								 	createdBy: "Anonymous"
								}
						 );
				}
			
			
			
	}

console.log(Images.find().count());

});
