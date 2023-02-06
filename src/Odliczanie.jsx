import React from 'react';
import PropTypes from 'prop-types'; 
import './Odliczanie.css';
import {godzinaMinutadoSekund, sekundyDoGodzinMinutSekund} from './utilsy'

const Odliczanie = props =>{
    const sekundyLekcje = godzinaMinutadoSekund(props.czasG, props.czasM);
    const sekundyTeraz= godzinaMinutadoSekund(props.obecnyCzas.godzina, props.obecnyCzas.minuta)+ props.obecnyCzas.sekunda;
    const pozostaloSekund = sekundyLekcje - sekundyTeraz;
    let pozostaloSekundTekst = pozostaloSekund >0 ? sekundyDoGodzinMinutSekund(pozostaloSekund): "Ta lekcja odbędzie się dopiero w następny "+props.dzien;

    // let border="4px solid red";
    // //trwa
    // if(sekundyTeraz>sekundyLekcje && sekundyTeraz<sekundyLekcje+2700){
    //     pozostaloSekundTekst = "Lekcja trwa";
    //     if(sekundyTeraz<sekundyLekcje+960){
    //         border = '4px solid lightgreen';
    //     }
    //     else if(sekundyTeraz<sekundyLekcje+1860){
    //         border = '4px solid green';
    //     }
    //     else if(sekundyTeraz<sekundyLekcje+2700){
    //         border = '4px solid darkgreen';
    //     }
    // }
    // //zakończona
    // else if(sekundyTeraz>sekundyLekcje){
    //     border = '4px solid orange';
    // }

    // //następna
    // else if(sekundyTeraz<sekundyLekcje){
    //     if(sekundyTeraz+2700<sekundyLekcje){
    //         border = '4px solid purple';
    //     }
    //     else{
    //         border = '4px solid blue';
    //     }
    // }

    // let lessonDay;

    // if(props.dzien==="Poniedziałek"){
    //     lessonDay = 1;
    // }else if(props.dzien==="Wtorek"){
    //     lessonDay = 2;
    // }else if(props.dzien==="Środa"){
    //     lessonDay = 3;
    // }else if(props.dzien==="Czwartek"){
    //     lessonDay = 4;
    // }else if(props.dzien==="Piątek"){
    //     lessonDay = 5;
    // }else{
    //     lessonDay = 10;
    // }

    
    // const today = new Date().getDay();
    // let ileDniDoLekcji = (lessonDay-today+7)%7;


    // if(lessonDay!=today){
    //     border='4px solid red';
    //     pozostaloSekundTekst="Ta lekcja odbędzie się dopiero w następny "+props.dzien+", czyli "+ ileDniDoLekcji+" dni";
    // }

    return(
    <div className="Odliczanie" style={{ borderLeft: border, borderRight: props.naSobie ? '4px solid pink ' : 'none' }}>
        <div className="Odliczanie_kasowanie" >
            <i className="edycja" onClick={()=>props.edytujLekcje(props.id)}>[E]</i>
            <b className="iks" onClick={()=>props.Usun(props.id)}>x</b>
        </div>
        {props.ile}. <strong>{props.name}</strong> {props.czasG} : {props.czasM}
        <br />
        {pozostaloSekundTekst}
    </div>
    );
};

Odliczanie.propTypes={
    obecnyCzas: PropTypes.shape({
        godzina: PropTypes.number,
        minuta: PropTypes.number,
        sekunda: PropTypes.number
    }),
    name: PropTypes.string,
    czasG: PropTypes.number,
    czasM: PropTypes.number,
    dzien: PropTypes.string,
    naSobie: PropTypes.bool,
    edytujLekcje: PropTypes.func,
    Usun: PropTypes.func
};

export default Odliczanie;