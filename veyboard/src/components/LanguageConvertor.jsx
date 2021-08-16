/* 
This file contains the code for the Language Translation functionality of the application.

Authors : Nishmitha Bhat, Rachel Anchan, Wilfred Daniel
*/

import React, { Component } from "react";
// import "../styles/styles.min.css";
class LanguageConvertor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text_to_translate: "",
      select_language: "",
      translated_sentence: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    fetch("http://localhost:5000/lang-conv", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text_to_translate: this.state.text_to_translate,
        select_language: this.state.select_language,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({ translated_sentence: result.translated_text });
      })
      .catch((er) => console.log(er));
  };
  render() {
    return (
      <>
        <div
          className="features-blue"
          style={{ height: "157px", color: "white" }}
        >
          <div className="container" style={{ height: "73px", color: "white" }}>
            <div className="intro" style={{ height: "85px", color: "white" }}>
              <p className="text-center pt-5">
                <i>Helps you translate any given sentence</i>
              </p>
            </div>
          </div>
        </div>
        <div className="newsletter-subscribe mt-5" style={{ color: "white" }}>
          <div className="container">
            <div className="row">
              <div className="col">
                <form onSubmit={(e) => this.onSubmit(e)}>
                  {/* <!-- Enter the text that the user wants to translate --> */}
                  <div className="form-group">
                    <label for="text-to-translate">
                      <strong>Enter the text you'd like to translate:</strong>
                    </label>
                    <textarea
                      style={{ color: "black !important" }}
                      value={this.state.text_to_translate}
                      className="form-control"
                      onChange={(e) => this.handleChange(e)}
                      name="text_to_translate"
                      id="text-to-translate"
                      rows="1"
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label for="select-language">
                      <strong>Translate to:</strong>
                    </label>
                    <select
                      style={{ color: "black" }}
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.select_language}
                      className="form-control"
                      name="select_language"
                      id="select-language"
                    >
                      <option></option>
                      <option value="af">Afrikaans</option>
                      <option value="sq">Albanian</option>
                      <option value="am">Amharic</option>
                      <option value="ar">Arabic</option>
                      <option value="hy">Armenian</option>
                      <option value="az">Azerbaijani</option>
                      <option value="eu">Basque</option>
                      <option value="be">Belarusian</option>
                      <option value="bn">Bengali</option>
                      <option value="bs">Bosnian</option>
                      <option value="bg">Bulgarian</option>
                      <option value="ca">Catalan</option>
                      <option value="ceb">Cebuano</option>
                      <option value="ny">Chichewa</option>
                      <option value="zh-Hans">Chinese (Simplified)</option>
                      <option value="zh-Hant">Chinese (Traditional)</option>
                      <option value="co">Corsican</option>
                      <option value="hr">Croatian</option>
                      <option value="cs">Czech</option>
                      <option value="da">Danish</option>
                      <option value="nl">Dutch</option>
                      <option value="en">English</option>
                      <option value="eo">Esperanto</option>
                      <option value="et">Estonian</option>
                      <option value="tl">Filipino</option>
                      <option value="fi">Finnish</option>
                      <option value="fr">French</option>
                      <option value="fy">Frisian</option>
                      <option value="gl">Galician</option>
                      <option value="ka">Georgian</option>
                      <option value="de">German</option>
                      <option value="el">Greek</option>
                      <option value="gu">Gujarati</option>
                      <option value="ht">Haitian Creole</option>
                      <option value="ha">Hausa</option>
                      <option value="haw">Hawaiian</option>
                      <option value="he">Hebrew</option>
                      <option value="hi">Hindi</option>
                      <option value="hmn">Hmong</option>
                      <option value="hu">Hungarian</option>
                      <option value="ic">Icelandic</option>
                      <option value="ig">Igbo</option>
                      <option value="id">Indonesian</option>
                      <option value="ga">Irish</option>
                      <option value="it">Italian</option>
                      <option value="ja">Japanese</option>
                      <option value="jw">Javanese</option>
                      <option value="kn">Kannada</option>
                      <option value="kk">Kazakh</option>
                      <option value="km">Khmer</option>
                      <option value="ko">Korean</option>
                      <option value="ku">Kurdish (Kurmanji)</option>
                      <option value="ky">Kyrgyz</option>
                      <option value="lo">Lao</option>
                      <option value="la">Latin</option>
                      <option value="lv">Latvian</option>
                      <option value="lt">Lithuanian</option>
                      <option value="lb">Luxembourgish</option>
                      <option value="mk">Macedonian</option>
                      <option value="mg">Malagasy</option>
                      <option value="ms">Malay</option>
                      <option value="ml">Malayalam</option>
                      <option value="mt">Maltese</option>
                      <option value="mi">Maori</option>
                      <option value="mr">Marathi</option>
                      <option value="mn">Mongolian</option>
                      <option value="my">Myanmar (Burmese)</option>
                      <option value="ne">Nepali</option>
                      <option value="no">Norwegian</option>
                      <option value="or">Odia</option>
                      <option value="ps">Pashto</option>
                      <option value="fa">Persian</option>
                      <option value="pl">Polish</option>
                      <option value="pt">Portuguese</option>
                      <option value="pa">Punjabi</option>
                      <option value="ro">Romanian</option>
                      <option value="ru">Russian</option>
                      <option value="sm">Samoan</option>
                      <option value="gd">Scottish Gaelic</option>
                      <option value="sr">Serbian</option>
                      <option value="st">Sesotho</option>
                      <option value="sn">Shona</option>
                      <option value="sd">Sindhi</option>
                      <option value="si">Sinhala</option>
                      <option value="sk">Slovak</option>
                      <option value="sl">Slovenian</option>
                      <option value="so">Somali</option>
                      <option value="es">Spanish</option>
                      <option value="su">Sudanese</option>
                      <option value="sw">Swahili</option>
                      <option value="sv">Swedish</option>
                      <option value="tg">Tajik</option>
                      <option value="ta">Tamil</option>
                      <option value="te">Telugu</option>
                      <option value="th">Thai</option>
                      <option value="tr">Turkish</option>
                      <option value="uk">Ukrainian</option>
                      <option value="ur">Urdu</option>
                      <option value="ug">Uyghur</option>
                      <option value="uz">Uzbek</option>
                      <option value="vi">Vietnamese</option>
                      <option value="cy">Welsh</option>
                      <option value="xh">Xhosa</option>
                      <option value="yi">Yiddish</option>
                      <option value="yo">Yoruba</option>
                      <option value="zu">Zulu</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mb-2"
                    id="translate"
                  >
                    Translate
                  </button>
                  <br />
                  <br />
                </form>
              </div>

              {/* <!-- The translated text that is returned is rendered here --> */}

              <div className="col">
                <form>
                  <div className="form-group" id="translator-text-response">
                    <label for="pronunciation">
                      <strong>User's Entered Text:</strong>
                    </label>
                    <textarea
                      value={this.state.text_to_translate}
                      style={{ color: "black" }}
                      readOnly
                      className="form-control"
                      id="entered-text"
                      rows="1"
                    ></textarea>
                  </div>

                  <div className="form-group" id="translator-text-response">
                    <label for="translation-result">
                      <strong>Translated Text:</strong>
                    </label>
                    <textarea
                      style={{ color: "black" }}
                      readOnly
                      value={this.state.translated_sentence}
                      className="form-control"
                      id="translation-result"
                      rows="1"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary mb-2 offset-10"
                    id="reset"
                    onClick={() =>
                      this.setState({
                        text_to_translate: "",
                        select_language: "",
                        translated_sentence: "",
                      })
                    }
                  >
                    Reset
                  </button>

                  {/* <!---  <form>
                            <div className="form-group" id="translator-text-response">
                                <label for="source-language"><strong>Destination Language:</strong></label>
                                <textarea readonly className="form-control" id="destination-language"
                                    rows="2">{{ destination_language }}</textarea> 
                            </div>
                        </form> --> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LanguageConvertor;
