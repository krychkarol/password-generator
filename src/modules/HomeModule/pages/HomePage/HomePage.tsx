import React, { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { BiCopy } from "react-icons/bi";
import "./HomePage.scss";


export const HomePage: React.FC = () => {

	const lowerCase = "abcdefghijklmnopqrstuvwxyz";
	const upperCase = lowerCase.toUpperCase();
	const numbers = "0123456789";
	const special = '!@#$%^&*()_+~`|}{[]:;?><,.-=';
	const msg = "Wybierz opcje";
	const passwordStrenghtMsg = ["Low password strength", "Average password strength", "High password strength"];

	const [length, setLength] = useState<number>(6);
	const [upper, setUpper] = useState<boolean>(true);
	const [lower, setLower] = useState<boolean>(false);
	const [numb, setNumb] = useState<boolean>(true);
	const [symbol, setSymbol] = useState<boolean>(true);
	const [password, setPassword] = useState<string>("");
	const [passwordStrength, setPasswordStrength] = useState<number>(0);

	const generatePassword = () => {
		let password = "";
		let result = "";

		// 4-16 char , 4x option / 10min - 45 max
		// 0 - 15 low
		// 16 - 24 low
		// 25 - 34 mid
		// 35+ strong

		let strength = 0;

		if (upper) {
			password = password.concat(upperCase)
			strength += 2;
		}
		if (lower) {
			password = password.concat(lowerCase)
			strength += 2;
		}

		if (numb) {
			password = password.concat(numbers)
			strength += 4;
		}

		if (symbol) {
			password = password.concat(special)
			strength += 5;
		}

		if (!password) {
			setPassword(msg)
			setPasswordStrength(strength)
		}
		else {
			for (let i = 0; i < length; i++) {
				result += password[(Math.floor(Math.random() * password.length))]
			}
			strength += (length * 2);
			setPasswordStrength(strength)
			setPassword(result)
		}
	}

	useEffect(() => {
		generatePassword();
	}, [length, upper, lower, numb, symbol])


	return (
		<div className="container">
			<h1>Password Generator</h1>
			<div className="container__character-length">
				<h2>Character Length</h2>
				<span className="container__character-length__value">{length}</span>
				<input className="container__character-length__range" type="range" min="4" max="16" defaultValue={length} onChange={(e) => setLength(parseInt(e.target.value))}></input>
			</div>
			<div className="container__options">
				<div className="container__options__checkbox">
					<input type="checkbox" checked={upper} onChange={() => setUpper(!upper)}></input>
					<span>Include Uppercase Letter</span>
				</div>
				<div className="container__options__checkbox">
					<input type="checkbox" checked={lower} onChange={() => setLower(!lower)}></input>
					<span>Include Lowercase Letter</span>
				</div>
				<div className="container__options__checkbox">
					<input type="checkbox" checked={numb} onChange={() => setNumb(!numb)}></input>
					<span>Include Numbers</span>
				</div>
				<div className="container__options__checkbox">
					<input type="checkbox" checked={symbol} onChange={() => setSymbol(!symbol)}></input>
					<span>Include Symbols</span>
				</div>
			</div>
			<div className="container__strenght">
				<div className="container__strenght__value">
					<h2>Strenght</h2>
					{
						passwordStrength > 34 ?
							<span>{passwordStrenghtMsg[2]}</span> :
							passwordStrength > 24 ?
								<span>{passwordStrenghtMsg[1]}</span> :
								<span>{passwordStrenghtMsg[0]}</span>
					}
				</div>
				<div className="container__strenght__bars">
					{
						passwordStrength > 34 ?
							<>
								<div className="green"></div>
								<div className="green"></div>
								<div className="green"></div>
								<div className="green"></div>
							</>
							:
							passwordStrength > 24 ?
								<>
									<div className="yellow"></div>
									<div className="yellow"></div>
									<div className="yellow"></div>
									<div></div>
								</> :
								passwordStrength > 15 ?
									<>
										<div className="red"></div>
										<div className="red"></div>
										<div></div>
										<div></div>
									</> :
									<>
										<div className="red"></div>
										<div></div>
										<div></div>
										<div></div>
									</>
					}

				</div>
			</div>
			<div className="container__result">
				<span>{password}</span>
				<FiRefreshCw className="icon" onClick={generatePassword} />
			</div>
			<button className="container__button" onClick={() => { navigator.clipboard.writeText(password) }}>
				<BiCopy className="icon" />
				<span>Copy Password</span>
			</button>
		</div>
	);
};
