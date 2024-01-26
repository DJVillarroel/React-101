import React from 'react';

class TypeItemRow extends React.Component{

    render(){
        return <li>{this.props.type}</li>
    }

}

class Pokemon extends React.Component{

    constructor(){
        super();

        this.state = {
            loadedCharacter: false,
            imgURL: null,
            id: null,
            name: null,
            types: [],
        }
    }

    getNewCharacter(){
        const idNumber = Math.ceil(Math.random()*1025);
        const url = `https://pokeapi.co/api/v2/pokemon/${idNumber}`;

        console.log(`Fetching from ${url}`);

        fetch(url)
            .then(response => response.json())
            .then(data => {

                const typesArray = data.types.map(typeName => typeName.type.name);
                const sprites = data['sprites'];

                this.setState({
                    loadedCharacter: true,
                    imgURL: sprites.front_default,
                    id: data.id,
                    name: data.name,
                    types: typesArray,
                })
            })

        
    }

    render(){

        const types = this.state.types.map((type, i) => { 
                return <TypeItemRow key={i} type={type}/>
        })

        return (
            <div>
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pokémon_logo.svg/1280px-International_Pokémon_logo.svg.png" width="400px" height="auto" alt="Pokemon-Logo"></img>
                </div>
                {
                    this.state.loadedCharacter &&
                    <div>
                        <img src={this.state.imgURL} alt="Pokemon"></img>
                        <p>ID: {this.state.id}</p>
                        <h1>Name: {this.state.name}</h1>
                        <ul>
                            {types}
                        </ul>
                    </div>
                    
                }
                <button type="button" className="btn-randomize"
                onClick={()=> this.getNewCharacter()} >Generate Random Pokemon</button>
            </div>
        )
    }

}

export default Pokemon;