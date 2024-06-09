import React, { Component } from 'react';

export class FormApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vocal: 0,
            dance: 0,
            visual: 0,
            total_status: 0
        };

        this.setVocal = this.setVocal.bind(this)
        this.setDance = this.setDance.bind(this)
        this.setVisual = this.setVisual.bind(this)
    }

    setVocal(event) {
        let newvocal = event.target.value;
        this.setState({
            vocal: newvocal,
            total_status: Number(newvocal) + Number(this.state.dance) + Number(this.state.visual)
        });
    }

    setDance(event) {
        let newdance = event.target.value;
        this.setState({
            dance: newdance,
            total_status: Number(this.state.vocal) + Number(newdance) + Number(this.state.visual)
        });
    }

    setVisual(event) {
        let newvisual = event.target.value;
        this.setState({
            visual: newvisual,
            total_status: Number(this.state.vocal) + Number(this.state.dance) + Number(newvisual)
        });
    }


    render() {
        return (
            <div>
                <table border="1">
                    <tbody>
                        <tr>
                            <td>Vo</td>
                            <td>Da</td>
                            <td>Vi</td>
                            <td>合計ステータス</td>
                        </tr>

                        <tr>
                            <td><input type="text" value={this.state.vocal} onChange={this.setVocal}></input></td>
                            <td><input type="text" value={this.state.dance} onChange={this.setDance}></input></td>
                            <td><input type="text" value={this.state.visual} onChange={this.setVisual}></input></td>
                            <td>{this.state.total_status}</td>
                        </tr>
                    </tbody >
                </table >
            </div >
        );
    }
}