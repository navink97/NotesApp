import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Note} from '../../shared/note-model';
import{ NotesService} from '../../shared/notes.service'

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note:Note;
  noteId:number;
  new:boolean;

  constructor(private notesService: NotesService, private router: Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    
    this.note = new Note();
    this.route.params.subscribe((params:Params)=>{
      if(params.id){
        this.note = this.notesService.get(params.id);
        this.noteId = params.id;
        this.new = false;
      }
      else{
        this.new =true;
      }
    })

    
  }

  cancel(){
    this.router.navigateByUrl('/')
  }

  onSubmit(formdata:NgForm){
    if(this.new){
      this.notesService.add(formdata.value);
      this.router.navigateByUrl('/')
    }
    else{
      this.notesService.update(this.noteId, formdata.value.title, formdata.value.body);
      this.router.navigateByUrl('/');
    }
  }
}
