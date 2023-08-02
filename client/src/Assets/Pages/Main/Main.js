
import React, { useEffect, useMemo, useRef, useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as faS from "@fortawesome/free-solid-svg-icons";

export default function Main() {
    const refCustomeQuantity = useRef(null);
    const [openCustome, SetOpenCustome] = useState(false);
    const [tempQuantity, SetTempQuantity] = useState(1);
    const [quantity, SetQuantity] = useState(50);
    const [words, SetWords] = useState([]);
    const [tempType, SetTempType] = useState("");
    const [typed, SetTyped] = useState([]);
    const URL = "https://random-word-api.vercel.app/api";

    const handleChangeQuantity = (e) => {
        e.preventDefault();
        SetQuantity(e.target.value);
    };
    const GetList =() => {
        fetch(`${URL}?words=${quantity}`).then(res => res.json()).then(list => SetWords(list))
    };

    const typedWindow = (e) => {
        e.preventDefault()
        if(e.target.value === " ") SetTempType("");
        if(e.target.value.includes(" ")) SetTyped(typed => [...typed, tempType]);
        else SetTempType(e.target.value);
    };

    useMemo(() => {GetList()},[quantity]);
    useMemo(() => {SetTempType("")}, [typed]);
    useEffect(()=> {

        GetList();
        let handleClickOutsideCustome = window.addEventListener("mousedown", (e) => {
            if(refCustomeQuantity.current && !refCustomeQuantity.current.contains(e.target)) {
                SetOpenCustome(false);
            }
        })
        return document.removeEventListener("click", handleClickOutsideCustome);

    }, []);

    return (
        <div>

            <div>
                <button onClick={handleChangeQuantity} value={10}>10</button>
                <button onClick={handleChangeQuantity} value={25}>25</button>
                <button onClick={handleChangeQuantity} value={50}>50</button>
                <button onClick={handleChangeQuantity} value={100}>100</button>

                <button onClick={e => SetOpenCustome(true)}>
                    <FontAwesomeIcon icon={faS.faToolbox} />
                </button>
                {openCustome && (
                    <div ref={refCustomeQuantity}>
                        <p>Custome</p>
                        <input type="number" value={tempQuantity} onChange={e => SetTempQuantity(e.target.value)} />
                        <button onClick={e=> {SetQuantity(tempQuantity); SetOpenCustome(false)}}>Ok</button>
                    </div>                    
                )}

            </div>

            <div key={"words"}
            style={{display: "flex", gap: "0.5rem", flexWrap: "wrap"}}
            onClick={e => document.getElementById("hidden-input").focus()}
            >
                {words.map(e => (
                    <div key={e}>
                        {e.split("").map(l => (<letter>{l}</letter>))}
                    </div>
                ))}
            </div>

            <div>
                <input type="text" value={tempType} onInput={typedWindow} autoFocus={true} id="hidden-input"/>
            </div>

        </div>
    )
}