import React, {Component} from 'react';
import Odliczanie from './Odliczanie';
import './witaj.css';
import EdycjaLekcji from './Edycja';
import uniqid from 'uniqid';
import { godzinaMinutadoSekund } from './utilsy';

let x=1;
class powitanie extends Component{
    constructor(){
        super();
        this.state={
        Czas:{
            godzina: new Date().getHours(),
            minuta: new Date().getMinutes(),
            sekunda: new Date().getSeconds()
        },
        Lekcje:[
         ],
        edytowaneLekcje:{
            ktora: x,
            id:uniqid(),
            name: "",
            czasG: -1,
            czasM: -1,
            dzien: "nic",
        }
        };
        this.dodanieLekcji = this.dodanieLekcji.bind(this);
        this.zapisanieLekcji = this.zapisanieLekcji.bind(this);
        this.usuwanieLekcji = this.usuwanieLekcji.bind(this);
        this.edycjaLekcji = this.edycjaLekcji.bind(this);
        this.czyscEdycje = this.czyscEdycje.bind(this);
        this.odswierzanie = this.odswierzanie.bind(this);
    }
    
    edycjaLekcji(id){
            this.setState(prevState=>({
                edytowaneLekcje: {...prevState.Lekcje.find(element=>element.id===id)}
            }))
    }
    dodanieLekcji(val){
        this.setState(prevState=>{
            return{
                edytowaneLekcje: Object.assign(prevState.edytowaneLekcje, val)
            }
        })
    }

    usuwanieLekcji(id){
        this.setState(prevState=>({
            Lekcje: prevState.Lekcje.filter(element=>element.id!==id)
        }),()=>localStorage.setItem("lekcje", JSON.stringify(this.state.Lekcje))
        );
    }

    czyscEdycje(){
        this.setState({edytowaneLekcje:{
            ktora: x,
            id:uniqid(),
            name: "",
            czasG: -1,
            czasM: -1,
            dzien: "nic",
        }})
    }
    zapisanieLekcji(){

            this.setState(prevState=>{
                const czyLekcjaJuzIstnieje = prevState.Lekcje.find(
                    element=>element.id===prevState.edytowaneLekcje.id
                );
                let aktualizowanieLekcji;
                if(czyLekcjaJuzIstnieje){
                    aktualizowanieLekcji=prevState.Lekcje.map(element=>
                        {
                            if(element.id=== prevState.edytowaneLekcje.id)
                                return prevState.edytowaneLekcje;
                            else
                                return element;
                        })
                }else{
                    aktualizowanieLekcji=[...prevState.Lekcje, prevState.edytowaneLekcje];
                }
                return{
                    Lekcje: aktualizowanieLekcji,
                    edytowaneLekcje:{
                        ktora: x,
                        id:uniqid(),
                     name:"",
                     czasG:-1,
                     czasM:-1,
                     dzien: "nic",
                 } 
                }
            },
            ()=>localStorage.setItem("lekcje", JSON.stringify(this.state.Lekcje))
            );   
        x++;    
    }

    odswierzanie(){
        this.setState({
            Czas:{
                godzina: new Date().getHours(),
                minuta: new Date().getMinutes(),
                sekunda: new Date().getSeconds()
            }
        });
    }
    componentDidMount(){
        const listaLekcji = JSON.parse(localStorage.getItem("lekcje")) || [];
        this.setState({Lekcje:listaLekcji});
        setInterval(this.odswierzanie, 1000);
    }

 render(){

    let start, end, start2, end2;
    const LekcjePon = this.state.Lekcje.map(element =>{
        if(element.dzien==="pon"){
            start= godzinaMinutadoSekund(element.czasG, element.czasM);
            end = start + 2700;
            let naSobie = false;
            for (let i = 0; i < this.state.Lekcje.length; i++) {
                const element2 = this.state.Lekcje[i];
                start2= godzinaMinutadoSekund(element2.czasG, element2.czasM);
                end2 = start2 + 2700;
                if(((start>start2 && start<end2) || (end>start2 && end<end2)) && element2.dzien == element.dzien){
                    naSobie = true;
                    break;
                }
            }
            return <Odliczanie 
                key={element.id} 
                id={element.id}
                ile={element.ktora} 
                obecnyCzas={this.state.Czas}
                name={element.name} 
                czasG={element.czasG} 
                czasM={element.czasM}
                dzien={"Poniedzia??ek"}
                naSobie={naSobie}
                Usun={id=>this.usuwanieLekcji(id)} 
                edytujLekcje={id=>this.edycjaLekcji(id)}/>     
        }
    })

    const LekcjeWto = this.state.Lekcje.map(element => {
        if(element.dzien === "wto") {
          start= godzinaMinutadoSekund(element.czasG, element.czasM);
          end = start + 2700;
          let naSobie = false;
          for (let i = 0; i < this.state.Lekcje.length; i++) {
              const element2 = this.state.Lekcje[i];
              start2= godzinaMinutadoSekund(element2.czasG, element2.czasM);
              end2 = start2 + 2700;
              if(((start>start2 && start<end2) || (end>start2 && end<end2)) && element2.dzien == element.dzien){
                  naSobie = true;
                  break;
              }
          }
          return <Odliczanie 
            key={element.id} 
            id={element.id}
            ile={element.ktora} 
            obecnyCzas={this.state.Czas}
            name={element.name} 
            czasG={element.czasG} 
            czasM={element.czasM}
            dzien={"Wtorek"}
            naSobie={naSobie}
            Usun={id=>this.usuwanieLekcji(id)} 
            edytujLekcje={id=>this.edycjaLekcji(id)}/>
        }
      });

      const LekcjeSro = this.state.Lekcje.map(element => {
        if(element.dzien === "sro") {
          start= godzinaMinutadoSekund(element.czasG, element.czasM);
          end = start + 2700;
          let naSobie = false;
          for (let i = 0; i < this.state.Lekcje.length; i++) {
              const element2 = this.state.Lekcje[i];
              start2= godzinaMinutadoSekund(element2.czasG, element2.czasM);
              end2 = start2 + 2700;
              if(((start>start2 && start<end2) || (end>start2 && end<end2)) && element2.dzien == element.dzien){
                  naSobie = true;
                  break;
              }
          }
          return <Odliczanie 
            key={element.id} 
            id={element.id}
            ile={element.ktora} 
            obecnyCzas={this.state.Czas}
            name={element.name} 
            czasG={element.czasG} 
            czasM={element.czasM}
            dzien={"??roda"}
            naSobie={naSobie}
            Usun={id=>this.usuwanieLekcji(id)} 
            edytujLekcje={id=>this.edycjaLekcji(id)}/>
        }
      });
      
      const LekcjeCzw = this.state.Lekcje.map(element => {
        if(element.dzien === "czw") {
          start= godzinaMinutadoSekund(element.czasG, element.czasM);
          end = start + 2700;
          let naSobie = false;
          for (let i = 0; i < this.state.Lekcje.length; i++) {
              const element2 = this.state.Lekcje[i];
              start2= godzinaMinutadoSekund(element2.czasG, element2.czasM);
              end2 = start2 + 2700;
              if(((start>start2 && start<end2) || (end>start2 && end<end2)) && element2.dzien == element.dzien){
                  naSobie = true;
                  break;
              }
          }
          return <Odliczanie 
            key={element.id} 
            id={element.id}
            ile={element.ktora} 
            obecnyCzas={this.state.Czas}
            name={element.name} 
            czasG={element.czasG} 
            czasM={element.czasM}
            dzien={"Czwartek"}
            naSobie={naSobie}
            Usun={id=>this.usuwanieLekcji(id)} 
            edytujLekcje={id=>this.edycjaLekcji(id)}/>
        }
    });  

    const LekcjePia= this.state.Lekcje.map(element =>{
        if(element.dzien==="pia"){
            start= godzinaMinutadoSekund(element.czasG, element.czasM);
            end = start + 2700;
            let naSobie = false;
            for (let i = 0; i < this.state.Lekcje.length; i++) {
                const element2 = this.state.Lekcje[i];
                start2= godzinaMinutadoSekund(element2.czasG, element2.czasM);
                end2 = start2 + 2700;
                if(((start>start2 && start<end2) || (end>start2 && end<end2)) && element2.dzien == element.dzien){
                    naSobie = true;
                    break;
                }
            }
            return <Odliczanie 
            key={element.id} 
            id={element.id}
            ile={element.ktora} 
            obecnyCzas={this.state.Czas}
            name={element.name} 
            czasG={element.czasG} 
            czasM={element.czasM}
            dzien={"Pi??tek"}
            naSobie={naSobie}
            Usun={id=>this.usuwanieLekcji(id)} 
            edytujLekcje={id=>this.edycjaLekcji(id)}/>
        }
    })

    const LekcjeNic= this.state.Lekcje.map(element =>{
        if(element.dzien==="nic"){
            start= godzinaMinutadoSekund(element.czasG, element.czasM);
            end = start + 2700;
            let naSobie = false;
            for (let i = 0; i < this.state.Lekcje.length; i++) {
                const element2 = this.state.Lekcje[i];
                start2= godzinaMinutadoSekund(element2.czasG, element2.czasM);
                end2 = start2 + 2700;
                if(((start>start2 && start<end2) || (end>start2 && end<end2)) && element2.dzien == element.dzien){
                    naSobie = true;
                    break;
                }
            }
            return <Odliczanie 
            key={element.id} 
            id={element.id}
            ile={element.ktora} 
            obecnyCzas={this.state.Czas}
            name={element.name} 
            czasG={element.czasG} 
            czasM={element.czasM}
            dzien={""}
            naSobie={naSobie}
            Usun={id=>this.usuwanieLekcji(id)} 
            edytujLekcje={id=>this.edycjaLekcji(id)}/>
        }
    })
    return(
        <div className='wrapper'>
            <div className='planLekcji'>
                <div className='pon dzien'>
                    <h1>Poniedzia??ek</h1>
                    {LekcjePon} 
                </div>
                <div className='wto dzien'>
                    <h1>Wtorek</h1>
                    {LekcjeWto}
                </div>
                <div className='sro dzien'>
                    <h1>??roda</h1>
                    {LekcjeSro}
                </div>
                <div className='czw dzien'>
                    <h1>Czwartek</h1>
                    {LekcjeCzw}
                </div>
                <div
                className='pia dzien'>
                    <h1>Pi??tek</h1>
                    {LekcjePia}
                </div>
            </div>
                
            <div className='srodek'>

                <div className='Legenda'>
                    <fieldset>
                        <legend>Legenda</legend>
                        <ul>
                            <li>Lekcje trwaj??ce
                                <ul>
                                    <li style={{color:"lightgreen"}}>Pocz??tek</li>
                                    <li style={{color:"green"}}>??rodek</li>
                                    <li style={{color:"darkgreen"}}>Koniec</li>
                                </ul>
                            </li>
                            <li style={{color:"orange"}}>Lekcje uko??czone</li>
                            <li>Lekcje nadchodz??ce 
                                <ul>
                                    <li style={{color:"blue"}}>Najbli??sza</li>
                                    <li style={{color:"purple"}}>Kolejna</li>
                                </ul>
                            </li>
                            <li style={{color:"red"}}>W nast??pnym tygodniu</li>
                            <li style={{color: "pink"}}>Dla lekcji odbywaj??cych si?? w tym samym czasie co inna lekcja</li>
                        </ul>
                    </fieldset>
                </div>

            <fieldset className='prawo'>
                <legend>Dodaj lekcje</legend>
                <EdycjaLekcji 
            name = {this.state.edytowaneLekcje.name}
            czasG = {this.state.edytowaneLekcje.czasG}
            czasM = {this.state.edytowaneLekcje.czasM}
            dzien = {this.state.edytowaneLekcje.dzien}
            onInputChange = {val =>this.dodanieLekcji(val)} 
            onSave={()=>this.zapisanieLekcji()}
            czyszczeEdycji={()=>this.czyscEdycje()}/>
            </fieldset>
            <div className="alert">
                <h1>Wpisano z??y znak. Wpisz cyfr??!!</h1>
            </div>

            </div>    
            

            <div className='BezDni'>
                <h1>Lekcje dodane bez dnia tygodnia</h1>
                {LekcjeNic}
            </div>
        </div>
    )
}
}

export default powitanie;