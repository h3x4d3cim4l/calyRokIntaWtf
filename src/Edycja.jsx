import React from "react";
import './Edycja.css';
import PropTypes from 'prop-types'; 
import {czyDobry, czyPoprawnyNumer, zmienZnakiNaLiczbe, czyNazwaIstnieje, czyGodzinaJestPrawidlowa, czyMinutaJestPrawidlowa, czyJestWpisane, czyJestWpisaneLiczba} from './utilsy'


const EdycjaLekcji = props=>{
    return(
        <div className="EdycjaLekcji">
            


            <div className="EdycjaLekcji_input-grupa">
                <label htmlFor="poleTekstowe">Podaj nazwe</label>
                <input type="text" name="name" id="name"  value={props.name}  onChange={(e)=> props.onInputChange({[e.target.name]: e.target.value})}/>
            </div>
            <div className="EdycjaLekcji_input-grupa">
                <label htmlFor="czasG">Podaj godzinę</label>
                <input type="number" name="czasG" id="czasG" value={props.czasG === -1 ? "" :props.czasG}  onKeyPress={e=>czyPoprawnyNumer(e)} onChange={(e)=> props.onInputChange({[e.target.name]: zmienZnakiNaLiczbe(e.target.value)})}/>
            </div>
            <div className="EdycjaLekcji_input-grupa">
                <label htmlFor="czasM">Podaj minuty</label>
                <input type="number" name="czasM" id="czasM" value={props.czasM === -1 ? "" :props.czasM} onKeyPress={e=>czyDobry(e)} onChange={((e)=> props.onInputChange({[e.target.name]: zmienZnakiNaLiczbe(e.target.value)}))}/>
            </div>
            <div className="EdycjaLekcji_input-grupa">
                <label htmlFor="dzien">Podaj dzień tygodnia</label>
                <select name="dzien" id="dzien" value={props.dzien}onChange={(e)=> props.onInputChange({[e.target.name]: e.target.value})}>
                    <option value="nic">Wybierz dzień tygodnia</option>
                    <option value="pon">Poniedziałek</option>
                    <option value="wto">Wtorek</option>
                    <option value="sro">Środa</option>
                    <option value="czw">Czwartek</option>
                    <option value="pia">Piątek</option>
                </select>   
            </div>
            <div className="EdycjaLekcji_input-grupa">
                <button disabled={!(czyNazwaIstnieje(props.name)) || !czyGodzinaJestPrawidlowa(props.czasG) || !czyMinutaJestPrawidlowa(props.czasM)} className="EdycjaLekcji_button" onClick={()=>{props.onSave(); 
                document.querySelectorAll("input").forEach(element => {
                    element.value="";
                });
                document.querySelector("#dzien").value="nic";
                }}>OK</button>
                <button disabled={!czyJestWpisane(props.name) && !czyJestWpisaneLiczba(props.czasG) && !czyJestWpisaneLiczba(props.czasM)} className="EdycjaLekcji_button" onClick={()=>props.czyszczeEdycji()}>Cancel</button>
            </div>
        </div>
    );
}
EdycjaLekcji.propTypes={
    name: PropTypes.string,
    czasG: PropTypes.number,
    czasM: PropTypes.number,
    onSave: PropTypes.func,
    czyPoprawnyNumer: PropTypes.func,
    czyszczeEdycji: PropTypes.func,
    czyDobry: PropTypes.func,
    zmienZnakiNaLiczbe: PropTypes.func,
    czyNazwaIstnieje: PropTypes.func,
    czyGodzinaJestPrawidlowa: PropTypes.func,
    czyMinutaJestPrawidlowa: PropTypes.func,
    czyJestWpisane: PropTypes.func,
    czyJestWpisaneLiczba: PropTypes.func
}
export default EdycjaLekcji;