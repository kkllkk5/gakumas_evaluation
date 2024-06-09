import React, { Component } from 'react';

export class FormApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vocal: 0,
            dance: 0,
            visual: 0,
            total_status: 0,
            need_finalexam_point: 0
        };

        this.setVocal = this.setVocal.bind(this)
        this.setDance = this.setDance.bind(this)
        this.setVisual = this.setVisual.bind(this)
        this.calcFinalExamBorder = this.calcFinalExamBorder.bind(this)
    }


    // Voの入力を反映
    setVocal(event) {
        let newvocal = event.target.value;
        this.setState({
            vocal: newvocal,
            total_status: Number(newvocal) + Number(this.state.dance) + Number(this.state.visual)
        });
    }

    // Daの入力を反映
    setDance(event) {
        let newdance = event.target.value;
        this.setState({
            dance: newdance,
            total_status: Number(this.state.vocal) + Number(newdance) + Number(this.state.visual)
        });
    }

    // Viの入力を反映
    setVisual(event) {
        let newvisual = event.target.value;
        this.setState({
            visual: newvisual,
            total_status: Number(this.state.vocal) + Number(this.state.dance) + Number(newvisual)
        });
    }

    // 対象ランクに必要な最終試験ptを計算
    calcFinalExamBorder() {
        let radio_elements = document.getElementsByName('aim_rank');
        let len = radio_elements.length;
        let aim_rank_id = '';


        for (let i = 0; i < len; i++) {
            if (radio_elements.item(i).checked) {
                aim_rank_id = radio_elements.item(i).value;
            }
        }


        let pt_border = 0
        // 狙うランクに応じてptボーダーを設定
        if (aim_rank_id === "1") {
            pt_border = 11500
        }
        else if (aim_rank_id === "2") {
            pt_border = 13000
        }
        else {
            return
        }

        // 最終試験1位ボーナスをカット
        pt_border -= 1700;

        // ステータス分をカット

        console.log(pt_border);
        console.log(this.state.total_status);
        pt_border -= Math.ceil((this.state.total_status) * 2.3);

        console.log(pt_border);

        let need_finalexam_point = 0;

        if (pt_border <= 1500) {
            need_finalexam_point = (pt_border * 10) / 3;
        }
        else if (pt_border <= 2250) {
            pt_border -= 1500;
            need_finalexam_point = 5000 + (pt_border * 20) / 3;
        }
        else if (pt_border <= 3050) {
            pt_border -= 2250;
            need_finalexam_point = 10000 + (pt_border * 25) / 2;
        }
        else if (pt_border <= 3450) {
            pt_border -= 3050;
            need_finalexam_point = 20000 + (pt_border * 25);
        }
        else if (pt_border <= 3650) {
            pt_border -= 3450;
            need_finalexam_point = 30000 + (pt_border * 50);
        }
        else {
            pt_border -= 3650;
            need_finalexam_point = 40000 + (pt_border * 100);
        }

        this.setState({
            need_finalexam_point: String(need_finalexam_point)
        })




    }


    render() {
        return (
            <div>
                <h3>学マス 最終試験ランクボーダー計算</h3>
                <table border="1">
                    <tbody>
                        <tr>
                            <td>各種ステータス</td>
                            <td>Vo</td>
                            <td>Da</td>
                            <td>Vi</td>
                            <td>合計ステータス</td>
                        </tr>

                        <tr>
                            <td></td>
                            <td><input type="text" value={this.state.vocal} onChange={this.setVocal}></input></td>
                            <td><input type="text" value={this.state.dance} onChange={this.setDance}></input></td>
                            <td><input type="text" value={this.state.visual} onChange={this.setVisual}></input></td>
                            <td>{this.state.total_status}</td>
                        </tr>
                        <tr>
                            <td>目標ランク</td>
                            <td>
                                <input type="radio" name="aim_rank" value="1" />A+
                                <input type="radio" name="aim_rank" value="2" />S
                            </td>
                        </tr>
                        <tr>
                            <td>必要な最終試験pt</td>
                            <td>{this.state.need_finalexam_point}</td>
                        </tr>
                    </tbody >
                </table >
                <center><button onClick={this.calcFinalExamBorder}>計算実行</button></center>
            </div >
        );
    }
}