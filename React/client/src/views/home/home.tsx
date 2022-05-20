import * as React from 'react';
import './home.css';

export interface IHomeProps {
}

export function Home(props: IHomeProps) {

    return (
        <>
            <div className="block-home">

                <div className="bubble">
                    <div className="content-bubble">
                        <h3>Rejoins la communauté</h3>
                        <img src="/images/codicon_account.png" alt="icon signup" />
                        {/* {{!-- {{#if isLog}} --}} */}
                        <a href="/user"><button>Mon compte</button></a>
                        {/* {{!-- {{else}} --}} */}
                        <a href="/auth/signup"><button>Inscription</button></a>
                        {/* {{!-- {{/if}} --}} */}
                    </div>
                </div>

                <div className="message">
                    {/* {{!-- {{#unless message}} <h1>Bienvenue sur forum Faas,</h1>{{/unless}} --}} */}
                    <p>
                        {/* {{!-- {{#if message}}{{message}} {{else}}  --}} */}

                        <p> en tant qu’utilisateur vous pouvez enregistrer ou consulter des fonctions javascript qui sont utilisable sur le forum ou via une api en http.</p>
                        <p> Vous pouvez donc tester les fonctions sur le forum ou l’appeler depuis votre code afin de s’assurer de l’intégration de cette dernière a votre applications.</p>
                        <p> Étant un forum nous valorisons également l’échange et la coopération via une section questions réponses.</p>
                        {/* {{!-- {{/if}} --}} */}
                    </p>
                </div>

                {/* {{!-- {{#if errorMessage}} --}} */}
                <div className="error">
                    <p>error</p>
                </div>
                {/* {{!-- {{/if}} --}} */}
            </div>
        </>
            /* <div className="error">
            </div>
            <div className="message">
            </div>
            <div className="first-part">
                <div className="presentations">
                    <h1>Présentations</h1>
                    <div className="block users">
                        <div className="user-block">
                            <div className="user-title">
                                <img className="title avatar" src="{{this.avatar}}" alt="avatar" />
                                <h2 className="title name"></h2>
                                <img
                                    className="title btn-details"
                                    src="/images/userDetails.png"
                                    alt="ico details"
                                    data-id="{{this._id}}"
                                />
                            </div>
                            <div className="details hide" data-id="{{this._id}}">
                                <div className="activity">
                                    <h3>Activités sur le forum:</h3>
                                    <p>Post:  Fonction: </p> 
                                </div>
                                <div className="description">
                                    <h3>Description:</h3>
                                    <p></p>
                                </div>
                                <div className="contact">
                                    <h3>Contact:</h3>
                                    <p>Cet utilisateur ne souhaite pas divulgué son contact.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pagination-users" data-nbpage="{{nbPage.users}}">
                        <button className="btn-less-page-users">&#60&#60</button>
                        <button className="active btn-page-users">1</button>
                        <button className="btn-page-users">2</button>
                        <button className="btn-page-users">3</button>
                        <button className="btn-page-users">4</button>
                        <button className="btn-more-page-users">&#62&#62</button>

                    </div>
                </div>
                <div className="functions">
                    <div className="head-new">
                        <h1>Fonction</h1>
                        <a href="/forum/function/new"><button className="new">New</button></a>
                    </div>
                    <div className="block funs">
                        <div className="function-block">
                            <div className="function-title">
                                <img className="title avatar" src="{{this.authorData.avatar}}" alt="avatar" />
                                <h2 className="title name"></h2>
                                <a href="/forum/function/{{this._id}}"><img
                                    className="title btn-details-fun"
                                    src="/images/details.png"
                                    alt="ico details"
                                /></a>
                            </div>
                        </div>
                    </div>
                    <div className="pagination-functions" data-nbpage="{{nbPage.functions}}">
                        <button className="btn-less-page-functions">&#60&#60</button>
                        <button className="active btn-page-functions">1</button>
                        <button className="btn-page-functions">2</button>
                        <button className="btn-page-functions">3</button>
                        <button className="btn-page-functions">4</button>
                        <button className="btn-more-page-functions">&#62&#62</button>

                    </div>
                </div>


                <div className="answers">
                    <div className="head-new">
                        <h1>Question</h1>
                        <a href="/forum/answer/new"><button className="new">New</button></a>
                    </div>
                    <div className="block answ">
                        <div className="answer-block">
                            <div className="answer-title">
                                <img className="title avatar" src="{{this.authorData.avatar}}" alt="avatar" />
                                <h2 className="title name"></h2>
                                <a href="/forum/answer/{{this._id}}"><img
                                    className="title btn-details-fun"
                                    src="/images/details.png"
                                    alt="ico details"
                                /></a>
                            </div>
                        </div>
                    </div>
                    <div className="pagination-answers" data-nbpage="{{nbPage.posts}}">
                        <button className="btn-less-page-answers">&#60&#60</button>
                        <button className="active btn-page-answers">1</button>
                        <button className="btn-page-answers">2</button>
                        <button className="btn-page-answers">3</button>
                        <button className="btn-page-answers">4</button>
                        <button className="btn-more-page-answers">&#62&#62</button>

                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            </div>
        </> */
    );
}
