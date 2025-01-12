import React, { Component } from 'react';

export class FormApp extends Component {


    constructor(props) {
        super(props);

        this.state = {
            //定期公演「初」用
            vocal: 0,
            dance: 0,
            visual: 0,
            aim_pt: 0,
            total_status: 0,
            need_finalexam_point: 0,
            difficulty_map: {
                "レギュラー": "0",
                "プロ": "1",
                "マスター": "2"
            },
            rank_id_map: {
                "A+": "1",
                "S": "2",
                "S+": "3",
                "SS": "4",
                "SS+": "5",
                "other": "99",
            },

            //NIA編用
            vocal_nia: 0,
            dance_nia: 0,
            visual_nia: 0,
            aim_pt_nia: 0,
            total_status_nia: 0,
            need_fan_vote: 0,
        };

        this.setVocal = this.setVocal.bind(this)
        this.setDance = this.setDance.bind(this)
        this.setVisual = this.setVisual.bind(this)
        this.setVocal_NIA = this.setVocal_NIA.bind(this)
        this.setDance_NIA = this.setDance_NIA.bind(this)
        this.setVisual_NIA = this.setVisual_NIA.bind(this)
        this.setAim_pt = this.setAim_pt.bind(this)
        this.setAim_pt_NIA = this.setAim_pt_NIA.bind(this)
        this.calcFinalExamBorder = this.calcFinalExamBorder.bind(this)
        this.calcFanVote_NIA = this.calcFanVote_NIA.bind(this)
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
    // Voの入力を反映（NIA）
    setVocal_NIA(event) {
        let newvocal = event.target.value;
        this.setState({
            vocal_nia: newvocal,
            total_status_nia: Number(newvocal) + Number(this.state.dance_nia) + Number(this.state.visual_nia)
        });
    }

    // Daの入力を反映（NIA）
    setDance_NIA(event) {
        let newdance = event.target.value;
        this.setState({
            dance_nia: newdance,
            total_status_nia: Number(this.state.vocal_nia) + Number(newdance) + Number(this.state.visual_nia)
        });
    }

    // Viの入力を反映（NIA）
    setVisual_NIA(event) {
        let newvisual = event.target.value;
        this.setState({
            visual_nia: newvisual,
            total_status_nia: Number(this.state.vocal_nia) + Number(this.state.dance_nia) + Number(newvisual)
        });
    }

    // 目標ptの入力を反映
    setAim_pt(event) {
        let newAim_pt = event.target.value;
        this.setState({
            aim_pt: newAim_pt
        });
    }

    // 目標ptの入力を反映（NIA）
    setAim_pt_NIA(event) {
        let newAim_pt = event.target.value;
        this.setState({
            aim_pt_nia: newAim_pt
        });
    }

    // 対象ランクに必要な最終試験ptを計算
    calcFinalExamBorder() {
        // ラジオボタンの値（目標ランク）を取得
        let radio_elements_aim_rank = document.getElementsByName('aim_rank_nia');
        let len_zim_rank = radio_elements_aim_rank.length;
        let aim_rank_id = '';

        for (let i = 0; i < len_zim_rank; i++) {
            if (radio_elements_aim_rank.item(i).checked) {
                aim_rank_id = radio_elements_aim_rank.item(i).value;
            }
        }

        // ラジオボタンの値（最終試験前/後）を取得
        let radio_elements_final_exam = document.getElementsByName('final_exam');
        let len_final_exam = radio_elements_final_exam.length;
        let final_exam = '';

        for (let i = 0; i < len_final_exam; i++) {
            if (radio_elements_final_exam.item(i).checked) {
                final_exam = radio_elements_final_exam.item(i).value;
            }
        }

        // ラジオボタンの値（難易度）を取得
        let radio_elements_difficulty = document.getElementsByName('difficulty');

        let len_difficulty = radio_elements_difficulty.length;
        let difficulty = '';

        for (let i = 0; i < len_difficulty; i++) {
            if (radio_elements_difficulty.item(i).checked) {
                difficulty = radio_elements_difficulty.item(i).value;
            }
        }

        let max_status_arr = [1000, 1500, 1800];

        let max_status = max_status_arr[Number(difficulty)];

        let total_status = this.state.total_status
        // 最終試験前だった場合，各ステータスに30を追加
        // ただし，カンストを超えた分は切り捨て

        if (final_exam === 'before') {
            let after_vo = Math.min(Number(this.state.vocal) + 30, max_status);
            let after_da = Math.min(Number(this.state.dance) + 30, max_status);
            let after_vi = Math.min(Number(this.state.visual) + 30, max_status);

            total_status = after_vo + after_da + after_vi;
        }
        // 何も選択されていない時
        // 暫定，ラジオボタン側でちゃんと処理させたい
        else if (final_exam === '') {
            radio_elements_final_exam.item(1).checked = true
        }
        console.log(total_status)

        let pt_border = 0
        // 狙うランクに応じてptボーダーを設定
        if (aim_rank_id === this.state.rank_id_map["A+"]) {
            pt_border = 11500
        }
        else if (aim_rank_id === this.state.rank_id_map["S"]) {
            pt_border = 13000
        }
        else if (aim_rank_id === this.state.rank_id_map["S+"]) {
            pt_border = 14500
        }
        else if (aim_rank_id === this.state.rank_id_map["SS"]) {
            pt_border = 16000
        }
        else if (aim_rank_id === this.state.rank_id_map["other"]) {
            pt_border = Number(this.state.aim_pt)
        }
        else {
            alert("不明なエラー");
            return
        }

        // 最終試験前だった場合，各種ステータスに30を追加して計算する
        // ただし，1500がカンストのため超えた分は切り捨て



        // 最終試験1位ボーナスをカット
        pt_border -= 1700;

        // ステータス分をカット
        pt_border -= Math.ceil(total_status * 2.3);


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


    // 対象ランクに必要なファン投票数を計算
    calcFanVote_NIA() {
        // ラジオボタンの値（目標ランク）を取得
        let radio_elements_aim_rank = document.getElementsByName('aim_rank');
        let len_zim_rank = radio_elements_aim_rank.length;
        let aim_rank_id = '';

        for (let i = 0; i < len_zim_rank; i++) {
            if (radio_elements_aim_rank.item(i).checked) {
                aim_rank_id = radio_elements_aim_rank.item(i).value;
            }
        }


        let pt_border = 0
        // 狙うランクに応じてptボーダーを設定
        if (aim_rank_id === this.state.rank_id_map["A+"]) {
            pt_border = 11500
        }
        else if (aim_rank_id === this.state.rank_id_map["S"]) {
            pt_border = 13000
        }
        else if (aim_rank_id === this.state.rank_id_map["S+"]) {
            pt_border = 14500
        }
        else if (aim_rank_id === this.state.rank_id_map["SS"]) {
            pt_border = 16000
        }
        else if (aim_rank_id === this.state.rank_id_map["SS+"]) {
            pt_border = 18000
        }
        else if (aim_rank_id === this.state.rank_id_map["other"]) {
            pt_border = Number(this.state.aim_pt_nia)
        }
        else {
            alert("不明なエラー");
            return
        }

        // ステータス分をカット
        let total_status_nia = this.state.total_status_nia
        pt_border -= Math.ceil(total_status_nia * 2.3);

        //必要なファン投票数を計算  
        let need_fan_vote = 0;

        if (pt_border <= 2000) {
            need_fan_vote = (pt_border * 10);
        }
        else if (pt_border <= 3700) {
            pt_border -= 2000;
            need_fan_vote = 20000 + (pt_border * 200) / 17;
        }
        else if (pt_border <= 5100) {
            pt_border -= 3700;
            need_fan_vote = 40000 + (pt_border * 100) / 7;
        }
        else if (pt_border <= 6400) {
            pt_border -= 5100;
            need_fan_vote = 60000 + (pt_border * 200) / 13;
        }
        else if (pt_border <= 7600) {
            pt_border -= 6400;
            need_fan_vote = 80000 + (pt_border * 50) / 3;
        }
        else {
            pt_border -= 7600;
            need_fan_vote = 100000 + (pt_border * 200) / 11;
        }

        this.setState({
            need_fan_vote: String(Math.ceil(need_fan_vote))
        })


    }


    render() {
        return (
            <><><><div>
                <h2>学マス 最終試験ボーダー計算</h2>

                <h3>・定期公演「初」</h3>

                <b>※最終試験で1位をとる前提で計算しています．</b>
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
                            <td>
                                <input type="radio" name="final_exam" value="before" />最終試験前
                                <input type="radio" name="final_exam" value="after" />最終試験後
                            </td>
                            <td><input type="text" value={this.state.vocal} onChange={this.setVocal}></input></td>
                            <td><input type="text" value={this.state.dance} onChange={this.setDance}></input></td>
                            <td><input type="text" value={this.state.visual} onChange={this.setVisual}></input></td>
                            <td>{this.state.total_status}</td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <table border="1">
                    <tbody>
                        <tr>
                            <td>難易度</td>
                            <td>
                                <input type="radio" name="difficulty" value={this.state.difficulty_map["レギュラー"]} />レギュラー
                                <input type="radio" name="difficulty" value={this.state.difficulty_map["プロ"]} />プロ
                                <input type="radio" name="difficulty" value={this.state.difficulty_map["マスター"]} />マスター
                            </td>
                        </tr>
                        <tr>
                            <td>目標ランク</td>
                            <td>
                                <input type="radio" name="aim_rank" value={this.state.rank_id_map["A+"]} />A+
                                <input type="radio" name="aim_rank" value={this.state.rank_id_map["S"]} />S
                                <input type="radio" name="aim_rank" value={this.state.rank_id_map["S+"]} />S+
                                <input type="radio" name="aim_rank" value={this.state.rank_id_map["SS"]} />SS
                                <input type="radio" name="aim_rank" value={this.state.rank_id_map["other"]} />任意の目標pt
                                <input type="text" value={this.state.aim_pt} onChange={this.setAim_pt} />
                            </td>

                        </tr>
                        <tr>
                            <td>必要な最終試験pt</td>
                            <td>{this.state.need_finalexam_point}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={this.calcFinalExamBorder}>計算実行</button>
            </div>
                <div>
                    <h3>・NIA編</h3>
                </div></><table border="1">
                    <tbody>
                        <tr>
                            <td>各種ステータス</td>
                            <td>Vo</td>
                            <td>Da</td>
                            <td>Vi</td>
                            <td>合計ステータス</td>
                        </tr>

                        <tr>
                            <td>最終オーディション後のステータス</td>
                            <td><input type="text" value={this.state.vocal_nia} onChange={this.setVocal_NIA}></input></td>
                            <td><input type="text" value={this.state.dance_nia} onChange={this.setDance_NIA}></input></td>
                            <td><input type="text" value={this.state.visual_nia} onChange={this.setVisual_NIA}></input></td>
                            <td>{this.state.total_status_nia}</td>
                        </tr>
                    </tbody>
                </table><br></br><table border="1">
                    <tbody>
                        <tr>
                            <td>目標ランク</td>
                            <td>
                                <input type="radio" name="aim_rank" value={this.state.rank_id_map["A+"]} />A+
                                <input type="radio" name="aim_rank" value={this.state.rank_id_map["S"]} />S
                                <input type="radio" name="aim_rank" value={this.state.rank_id_map["S+"]} />S+
                                <input type="radio" name="aim_rank" value={this.state.rank_id_map["SS"]} />SS
                                <input type="radio" name="aim_rank" value={this.state.rank_id_map["SS+"]} />SS+
                                <input type="radio" name="aim_rank" value={this.state.rank_id_map["other"]} />任意の目標pt
                                <input type="text" value={this.state.aim_pt_nia} onChange={this.setAim_pt_NIA} />
                            </td>

                        </tr>
                        <tr>
                            <td>必要なファン投票数</td>
                            <td>{this.state.need_fan_vote}</td>
                        </tr>
                    </tbody>
                </table><button onClick={this.calcFanVote_NIA}>計算実行</button></>
                <div>
                    <br></br>
                    <b>更新履歴</b>
                    <br></br>
                    2025-01-12 NIA編に仮対応<br></br>
                    2024-10-30 目標ランクにSSを追加

                </div></>

        );
    }
}