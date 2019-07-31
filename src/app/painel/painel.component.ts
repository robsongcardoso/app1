import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {


  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso = 0

  public tentativas: number = 3
//Expor para componentes pais, no caso app.component.ts
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() {
    this.atualizaRodada()
  }

  ngOnInit() {
  }

  ngOnDestroy(){
   
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {

    if (this.rodadaFrase.FrasePtBr == this.resposta) {
      //Trocar pergunta da rodada
      this.rodada++

      //Progresso
      this.progresso = this.progresso + (100 / this.frases.length)

      //Sucesso
      if (this.rodada === 4) {
        this.encerrarJogo.emit('vitoria')
      }

      //Atualiza o objeto rodadafrase
      this.atualizaRodada()

    } else {
      this.tentativas--
      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota')
      }
    }
  }

  //Define frase da rodada com base em alguma logica
  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
    //Limpar a resposta
    this.resposta = ''
    //console.log(this.rodadaFrase)
  }

}
