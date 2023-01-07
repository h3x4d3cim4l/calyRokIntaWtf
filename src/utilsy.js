
export function czyPoprawnyNumer(e){
    var x= document.getElementsByClassName("alert");
    if(isNaN(parseInt(e.key, 10))===true) return e.preventDefault(), x[0].style.display="block";
    return true, x[0].style.display="none";
}

export function czyDobry(e){
    var x= document.getElementsByClassName("alert");
    if(/[0-9]/.test(e.key)) return true, x[0].style.display="none";
    return e.preventDefault(), x[0].style.display="block";
}

export function zmienZnakiNaLiczbe(val){
    if(val==="")
    return -1;
    return parseInt(val, 10);
}

export function czyNazwaIstnieje(val){
    if(val.length >0 && !/(\d)\w+/.test(val))
    return true;
    return false;
}

export function czyGodzinaJestPrawidlowa(val){
    parseInt(val, 10)
    if(val>24 || val<=0)
    return false;
    return true;
}

export function czyMinutaJestPrawidlowa(val){
    parseInt(val, 10)
    if(val>59 || val<=0)
    return false;
    return true;
}

export function czyJestWpisane(val){
    if(val==="") return false;
    return true;
}

export function czyJestWpisaneLiczba(val){
    if(val===-1) return false;
    return true;
}

export function godzinaMinutadoSekund(g, m){
    return g*3600 + m*60;
}

export function sekundyDoGodzinMinutSekund(s){
    let tmpSekundy = s;
    const godziny = Math.floor(tmpSekundy / 3600).toString().padStart(2, 0);
    tmpSekundy -= godziny * 3600;
    const minuty = Math.floor(tmpSekundy / 60).toString().padStart(2, 0);
    tmpSekundy -= minuty*60;
    const sekundy = tmpSekundy.toString().padStart(2, 0);
    return `${godziny}:${minuty}:${sekundy}`;
}