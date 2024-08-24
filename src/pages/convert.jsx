import React, { useState, useEffect } from 'react';
import convert from 'convert-units';
import Fraction from 'fraction.js';

const FoodCalculator = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputUnit, setInputUnit] = useState("oz");
    const [outputUnit, setOutputUnit] = useState("lb");
    const [outputValue, setOutputValue] = useState("");
    const [convertedUnit, setConvertedUnit] = useState("");
    const [textareaContent, setTextareaContent] = useState("");

    const unitNames = {
        "oz": "ounces (oz)",
        "lb": "pounds (lb)",
        "tsp": "teaspoons (tsp)",
        "Tbs": "tablespoons (Tbs)",
        "mg": "milligrams (mg)",
        "g": "grams (g)",
        "kg": "kilograms (kg)",
        "ml": "milliliters (mL)",
        "l": "liters (L)",
        "kl": "kiloliters (kL)",
        "cup": "cups (cup)",
        "pnt": "pints (pnt)",
        "qt": "quarts (qt)",
        "gal": "gallons (gal)",
        "C": "Celsius (C)",
        "F": "Fahrenheit (F)"
    };

    const inputUnitOptions = ["oz", "lb", "tsp", "Tbs", "mg", "g", "kg", "ml", "l", "kl", "cup", "pnt", "qt", "gal", "C", "F"];
    const [outputUnitOptions, setOutputUnitOptions] = useState(inputUnitOptions);

    useEffect(() => {
        if (inputUnit) {
            const validOutputUnitOptions = convert().from(inputUnit).possibilities();
            const filtered = inputUnitOptions.filter(unit => validOutputUnitOptions.includes(unit));
            setOutputUnitOptions(filtered);

            if (!filtered.includes(outputUnit) && filtered.length > 0) {
                if (inputUnit === filtered[0]) setOutputUnit(filtered[1]);
                else setOutputUnit(filtered[0]);
            }
        }
    }, [inputUnit]);

    const handleConvert = () => {
        try {
            const result = convert(inputValue).from(inputUnit).to(outputUnit);
            let conversionString;

            if (inputValue === "" || inputValue === "0") {
                setOutputValue('Choose a value to convert');
                setConvertedUnit('');
            } else if (!Number.isInteger(result)) {
                let fraction = new Fraction(result);
                const validDenominators = [2, 3, 4, 8, 16, 100];
                let convertedAmount;

                if (validDenominators.includes(fraction.d))
                    convertedAmount = fraction.toFraction(true);
                else
                    convertedAmount = parseFloat(result.toFixed(3));

                conversionString = `${inputValue} ${unitNames[inputUnit]} = ${convertedAmount} ${unitNames[outputUnit]}`;
                setOutputValue(convertedAmount);

                setTextareaContent(prev => prev === "" ? conversionString : `${conversionString}\n${prev}`);
                setConvertedUnit(outputUnit);
            } else {
                conversionString = `${inputValue} ${unitNames[inputUnit]} = ${result} ${unitNames[outputUnit]}`;
                setOutputValue(result);

                setTextareaContent(prev => prev === "" ? conversionString : `${conversionString}\n${prev}`);
                setConvertedUnit(outputUnit);
            }
        } catch (error) {
            setOutputValue('Invalid conversion');
            setConvertedUnit('');
        }
    };

    const changeInputUnit = (unit) => {
        if (unit === outputUnit) {
            setOutputUnit(inputUnit);
            setInputUnit(unit);
        } else {
            setInputUnit(unit);
        }
    };

    const clearNotepad = () => {
        setTextareaContent("");
    }

    return (
        <div className="food-calculator">
            <div className="converter">
                <h2 style={{ color: "white" }}>Converter</h2>
                <div className="btn-group">
                    <div className="dropdown mr-2">
                        <button className="unit-btn btn dropdown-toggle" type="button" id="inputUnitDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                            {unitNames[inputUnit]}
                        </button>
                        <div className="dropdown-menu w-100" aria-labelledby="inputUnitDropdown">
                            {inputUnitOptions.filter(unit => ["oz", "lb", "mg", "g", "kg"].includes(unit)).map((unit) => (
                                <a key={unit} className="dropdown-item" onClick={() => changeInputUnit(unit)}>
                                    {unitNames[unit]}
                                </a>
                            ))}
                            <hr className="dropdown-divider"></hr>
                            {inputUnitOptions.filter(unit => ["tsp", "Tbs", "ml", "l", "kl", "cup", "pnt", "qt", "gal"].includes(unit)).map((unit) => (
                                <a key={unit} className="dropdown-item" onClick={() => changeInputUnit(unit)}>
                                    {unitNames[unit]}
                                </a>
                            ))}
                            <hr className="dropdown-divider"></hr>
                            {inputUnitOptions.filter(unit => ["C", "F"].includes(unit)).map((unit) => (
                                <a key={unit} className="dropdown-item" onClick={() => changeInputUnit(unit)}>
                                    {unitNames[unit]}
                                </a>
                            ))}
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/swap.png`} alt="swap" className="swap-img" onClick={() => [setInputUnit(outputUnit), setOutputUnit(inputUnit)]}></img>
                    </div>
                    <span className="m-2">to</span>
                    <div className="dropdown">
                        <button className="unit-btn btn dropdown-toggle" type="button" id="outputUnitDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                            {unitNames[outputUnit]}
                        </button>
                        <div className="dropdown-menu w-100" aria-labelledby="outputUnitDropdown">
                            {outputUnitOptions.filter(unit => unit !== inputUnit).map((unit) => (
                                <a key={unit} className="dropdown-item" href="#" onClick={() => setOutputUnit(unit)}>
                                    {unitNames[unit]}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="convert-result-buttons">
                        <input type="number" className="form-control" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter quantity" />
                        <button className="btn submit-convert" onClick={handleConvert}>Convert</button>
                    </div>
                </div>
                {outputValue && <div className="convert-result">{outputValue} {unitNames[convertedUnit]}</div>}
            </div>
            <div className="notepad">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>Notepad</h2>
                    <button className="btn submit-convert" onClick={clearNotepad}>Clear</button>
                </div>
                <textarea disabled className="form-control" value={textareaContent}></textarea>
            </div>
        </div >
    );
};

export default FoodCalculator;
