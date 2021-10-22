import { useEffect, useState} from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { instanceAxs } from '../../../api/Api';

import './MyAnnonces.css';

import AnnonceDetail from './AnnonceDetail';
import Annonce from './Annonce';

function MyAnnonces(){

    let { path,url } = useRouteMatch();
    const [annonces, setAnnonces] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        instanceAxs.get('/myannonces')
            .then(result => {
                if(result.data.message === "user's annonces"){
                    setAnnonces(result.data.annonces);
                    setLoading(false)
                    console.log("ds")
                } else {
                    console.log(result.data.message)
                }
            })
    })

    return(
        <div>
            <Switch>
                <Route exact path={path}>
                    { !isLoading ? 
                        <div>
                            <input type="text" className="form-control myAnnoncesSearchField" placeholder="Søk i Mine Annonser..."></input>
                            {annonces.map(annonce => {
                                return(
                                    <div key={annonce.annonceId}><Link to={`${url + '/' + annonce.annonceId}`}><Annonce annonce={annonce} /></Link>
                                    </div>
                                )
                            })}
                        </div>
                        : 
                        <div>Loading</div>
                    }
                </Route>
                <Route path={`${path}/:annonceId`}>
                    { !isLoading ? 
                        <div>
                         <AnnonceDetail annonces={annonces}/>
                        </div> 
                        : 
                        <div>Loading</div>
                    }
                </Route>
            </Switch>
        </div>
    )
    
    
}

export default MyAnnonces;