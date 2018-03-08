import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  formGroup: FormGroup;
  msgInvalid: string;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    this.msgInvalid = "";
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      valor01: new FormControl(''),
      valor02: new FormControl(''),
    })
  }

  /** Funcao operacao de Soma */
  public opSoma(data) {
    const isNumber01 = this.isNumber(data.valor01);
    const isNumber02 = this.isNumber(data.valor02);

    if (isNumber01 === true && isNumber02 === true) {
      const valor01 = this.formatNumber(data.valor01);
      const valor02 = this.formatNumber(data.valor02);

      const result = valor01 + valor02;

      this.showAlert(result);
    } else {
      if (isNumber01 == false && isNumber02 == false) {
        this.msgInvalid = "Os valores estão incorretos";
      } else if (isNumber01 == false) {
        this.msgInvalid = "O valor 01 está incorreto";
      } else {
        this.msgInvalid = "O valor 02 está incorreto";
      }
    }
  }

  /** Verifica se o valor inserido e um numero */
  private isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  /** Funcao necessaria para formatar os numeros para a operacao */
  private formatNumber(val: string) {
    const aux = val.split('.');

    if (aux[1] !== null && aux[1] !== undefined) {
      return Number(aux[0] + '.' + aux[1]);
    } else {
      return Number(val);
    }

  }

  /** Alert com o resultado */
  private showAlert(val) {
    let alert = this.alertCtrl.create();

    alert.setTitle('Resultado');
    alert.setSubTitle('O resultado da sua Soma é: ');
    alert.addButton({ text: 'Ok' });
    alert.setMessage(val);

    alert.present();
  }

}
