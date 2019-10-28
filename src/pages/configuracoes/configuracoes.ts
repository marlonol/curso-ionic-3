import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { SobrePage } from '../sobre/sobre';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {
  rootPage = PerfilPage
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }
  abrirPerfil(){
    this.navCtrl.push(PerfilPage)
  }
  abrirSobre(){
    this.navCtrl.push(SobrePage)
  }
  closeMenu(){
    this.navCtrl.setRoot(TabsPage)
  }

}
