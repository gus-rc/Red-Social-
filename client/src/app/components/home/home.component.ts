/*import {Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl:'./home.component.html'
})
export class HomeComponent implements OnInit{
    public title:String;
    constructor(){
        this.title = 'Bienvenido a NGSocial'
    }

    ngOnInit (){
        console.log('home.component cargado.');
    }
}
*/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public title : string;
	public identity;

	constructor(
		private _userService: UserService,
		) {
		this.title = 'Bienvenido a NGSocial';
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		
		
	}

}