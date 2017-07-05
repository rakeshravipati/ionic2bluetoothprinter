import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare let DatecsPrinter:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	DatecsPrinter: any;
	public printerslist;
	public status = "Failure";
	public feedlines:Number = 1;

	constructor(public navCtrl: NavController) {
		this.getPrintersList();
		//this.connectDevice();
		//this.printSampleText();
	}


	public listBluetoothDevices(){
		return new Promise((resolve, reject) => {
		    DatecsPrinter.listBluetoothDevices(
		      function (success) {
		        resolve(success);
		      },
		      function (error) {
		        reject(error);
		      });          
		});
	}

	getPrintersList(){
		this.printerslist = [];
		this.status = "";
		this.listBluetoothDevices().then(result => {
			this.printerslist = result;
			this.status = "Success";
	    }).catch(err => {
			console.log(err);
	    });
	}

	connectDevice(){
		alert(this.printerslist[0].address);
		DatecsPrinter.connect(this.printerslist[0].address, function (success) {
			alert(JSON.stringify(success));
        }, function (error) {
            alert(JSON.stringify(error));
        });
	}

	printSampleText(){
        DatecsPrinter.printSelfTest( function (success) {
            alert(JSON.stringify(success));
        }, function (error) {
            alert('Error');
        });
	}

	public printText(text, charset = 'UTF-8'){
		alert(text);
        DatecsPrinter.printText( text, charset, function (success) {
        	alert(JSON.stringify(success));
        }, function (error) {
       		alert("error");
        });
    }

    provideFeed(lines){
    	alert(lines)
    	DatecsPrinter.feedPaper( lines, function (success) {
            alert(JSON.stringify(success));
        }, function (error) {
            alert(JSON.stringify(error));
        });
    }

    getStatus(){
        DatecsPrinter.getStatus( function (success) {
            alert(JSON.stringify(success));
        }, function (error) {
            alert(JSON.stringify(error));
        });
    }

    printBarcode(data = '1234445775', type = 73 ){
        DatecsPrinter.printBarcode( type, data, function (success) {
            this.provideFeed(100);
            alert(JSON.stringify(success));
        }, function (error) {
            alert(JSON.stringify(error));
        });
    }

    print2DBarcode(data = 'PDF1234445775417', type = 74 ){
        DatecsPrinter.printBarcode( type, data, function (success) {
            this.provideFeed(100);
            alert(JSON.stringify(success));
        }, function (error) {
            alert(JSON.stringify(error));
        });
    }

    public printPage(){
        DatecsPrinter.printPage( function (success) {
        	alert(JSON.stringify(success));
        }, function (error) {
        	alert(JSON.stringify(error));
        });
    }

    printMyImage() {
		var image = new Image();
		image.src = 'assets/icon.png';
		image.onload = function() {
		var canvas = document.createElement('canvas');
		canvas.height = 150;
		canvas.width = 200;
		var context = canvas.getContext('2d');
		context.drawImage(image, 0, 0);
		var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, ""); //remove mimetype
		DatecsPrinter.printImage(
			imageData, //base64
			canvas.width, 
			canvas.height, 
			1, 
		function(success) {
			alert(JSON.stringify(success));
			this.printBarcode();
			this.provideFeed();
			},
		function(error) {
			  alert(JSON.stringify(error));
			}
		)};
	}
}