import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {
  public nome_usuario: string = "Marlitos"
  public zero: number = 0
  now = new Date
  zeroornot(){
    if( this.now.getMonth() > 10){
        this.zero = null;
    }
  }
  public lista_filmes = new Array<any>()
  public page = 1 

  public data_hoje: any = this.now.getDate() + "/" + this.zero + this.now.getMonth() + "/" + this.now.getFullYear()
  public objeto_feed = {
      titulo: "Marlitos",
      data: this.data_hoje,
      descricao: "Estou criando um balão...",
      qntd_likes: 12,
      qntd_comments: 4,
      time_comment: "11h ago"
  }
  public loader
  public refresher
  public isRefreshing: boolean = false
  public infiniteScroll
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private movieProvider: MoovieProvider,
              public loadingCtrl: LoadingController) {  }
  
  public somaDoisNumeros( num1: number , num2: number ): void{
    alert("A soma dá: " + (num1 + num2))
  }
  
  doRefresh(refresher) {
    this.refresher = refresher
    console.log('Begin async operation', refresher);
    this.isRefreshing = true
    this.carregarFilmes()
    
  }

  ionViewDidEnter() {
   this.carregarFilmes()
  }
  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando, aguarde...",
      
    });
    this.loader.present();
  }
  fechaCarregando(){
    this.loader.dismiss()
  }

  carregarFilmes(newpage: boolean = false){
    this.abreCarregando()
    this.movieProvider.getLatestMovies(this.page).subscribe(
      data=>{
        const response = (data as any)
        const objeto_retorno = JSON.parse(response._body)
        
        if(newpage){
          this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results)
          this.infiniteScroll.complete()
        }else{
          this.lista_filmes = objeto_retorno.results 
        }

        console.log(objeto_retorno)
        this.fechaCarregando()
        if (this.isRefreshing){
            this.refresher.complete();
            this.isRefreshing = false        
        }
      },error =>{
        console.log(error)
        this.fechaCarregando()
        if (this.isRefreshing){
          this.refresher.complete();
          this.isRefreshing = false        
        }
      }
    )
  }

  abrirDetalhes(filme){
    console.log(filme)
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id })
  }

  doInfinite(infiniteScroll) {
    this.page++
    this.infiniteScroll = infiniteScroll
    this.carregarFilmes(true)
  }


}
