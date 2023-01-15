import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { AuthService } from '../../services/auth.service';
import { usuarioGetI } from '../../interfaces/usuarioGet.interface';
import { FileUploadsService } from '../../services/file-uploads.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {
    /* public ocultarModal : boolean = false; */
   /*  public usuario !: usuarioGetI; */
    public imagenSubir!: File
    public imgTemp : any
      constructor(
                public modalImagenService :ModalImagenService,
                private authService :AuthService,
                private fileUploadService :FileUploadsService){
              /*     this.usuario = this.authService.usuario; */
      }

     cerrarModal(){
      /* this.ocultarModal  = true; */
      this.imgTemp = null;
      this.modalImagenService.cerrarModal();
     }

     cambiarImagen(file : File){
      this.imagenSubir =  file
      if(!file){
       return this.imgTemp = null;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () =>{
       this.imgTemp = reader.result;
       console.log(reader.result);
      }
   }


   subirImagen(){
    const id = this.modalImagenService.id
    const tipo = this.modalImagenService.tipo
    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo ,id)//el id dependera de el modal que de todos los usuarios al que estemos dando
                                                                                                //click
          .then(img =>{

            if(img){

              Swal.fire('Guardado' ,'Imagen Actualizada correctamene','success')

              this.modalImagenService.nuevaImagen.emit(img)

              this.cerrarModal();
            }else{
              Swal.fire({ title: 'Error', text: 'Debe ser una imagen (png, jpg, jpeg)', icon: 'error' });
            }


          })
      }
}
