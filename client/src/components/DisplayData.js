import React from 'react'

export default () => {
  return (
    <div>
            <ul>
            {this.state.movies.map((movie)=>{
                return <li>{movie.title}</li>
            })}
            </ul>
    </div>
  )
}

    // componentWillMount(){
    //     let movieQuery = this.state.query;
    //     let searchURL = `https://api.themoviedb.org/3/search/movie?api_key=559a0b316b5f920e0a1c53116fa14b54&language=en-US&query=star%20wars&page=1&include_adult=false`
    //     fetch(searchURL)
    //     .then((response)=>{
    //         return response.json()
    //     })
    //     .then((data)=>{
    //         console.log(data)
    //         this.setState({
    //             movies: data.results,
    //         }) 
    //     })
    // }