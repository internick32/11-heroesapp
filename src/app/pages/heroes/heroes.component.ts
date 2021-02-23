import { HeroeModel } from './../../models/heroe.model';
import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor( private heroesService: HeroeService ) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesService.getHeroes()
    .subscribe( resp => {
      this.heroes = resp;
      this.cargando = false;
     })
  }  

  borrarHeroe( heroe: HeroeModel, i: number ){

    Swal.fire({
      title: 'Estas seguro?',
      text: `Estas seguro de borrar a ${heroe.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if( resp.value ) {
        this.heroes.splice(i,1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });

    this.heroes.splice(i, 1);
    this.heroesService.borrarHeroe( heroe.id ).subscribe();
  }

}
