import{Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';


@Component({
    selector:'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit{
    public title:string;
    public user:User;
    public status: string;
    public identity;
    public token;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Identificate';
        this.user = new User("", "",  "", "",  "", "", "ROLE_USER", "");
    }
    ngOnInit(){
        console.log('Componente de login cargando...');
        
    }
    onSubmit(){
        alert(this.user.email);
        alert(this.user.password);
        console.log(this.user);

        //loguear usuario y conseguir sus datos
        this._userService.signup(this.user).subscribe(
            response =>{
                this.identity = response.user;

                console.log(this.identity);

                if(!this.identity|| !this.identity._id){
                    this.status ='error';
                }else{
                    
                    
                    //persistir datos del usuario
                    localStorage.setItem('identity',JSON.stringify(this.identity));

                    //conseguir token
                    this.getToken();
                }
              //  console.log(response.user);
                
            },
            error=>{
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';

                }

            }
        );
     }
        getToken(){
            this._userService.signup(this.user, 'true').subscribe(
                response =>{
                    this.token = response.token;

                    console.log(this.token);

                    if(this.token.length <=0){
                        this.status ='error';
                    }else{

                        //persistir token de usuario
                        localStorage.setItem('token',this.token);
    
                        //conseguir contadores o estadisticas de usuario
                        this.getCounters();
                
                        //this._router.navigate(['/']);
                    }
                  //  console.log(response.user);
                    
                },
                error=>{
                    var errorMessage = <any>error;
                    console.log(errorMessage);
    
                    if(errorMessage != null){
                        this.status = 'error';
    
                    }
    
                }
            );
    }
    getCounters(){
        this._userService.getCounters().subscribe(
			Response=> {
                console.log(Response);
                localStorage.setItem('stats', JSON.stringify(Response));
                this.status = 'success';
                this._router.navigate(['/']);
			},
			error =>{
				console.log(<any> error);

			}
		)
    }
    
}