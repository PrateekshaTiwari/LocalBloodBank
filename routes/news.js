const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

var options = {
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
    params: {
      q: 'Blood Health',
      pageNumber: '1',
      pageSize: '15',
      autoCorrect: 'true',
      safeSearch: 'false',
      withThumbnails: 'true',
      fromPublishedDate: 'null',
      toPublishedDate: 'null'
    },
    headers: {
      'x-rapidapi-key':  process.env.API_KEY1,//'55e0ca442bmshbbc6b2ccd48264ap1ace4fjsn61865348c81f',
      'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
    }
  };
  

newsRouter.get('', async(req, res) => {
    try {
      
         
          axios.request(options).then(function (response) {
              const newsAPI =response.data.value;
              //console.log(newsAPI);
              res.render('more', { articles : newsAPI})
          }).catch(function (error) {
              console.error(error);
          });

      
       
     /* const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/`)
      res.render('more', { articles : newsAPI.data })
      */
    } catch (err) {
        if(err.response) {
            res.render('news', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('news', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles : null })
            console.error('Error', err.message)
        }
    } 
})

newsRouter.get('/:id', async(req, res) => {
    let articleID = req.params.id
    console.log(articleID);
    try {
        axios.request(options).then(function (response) {
            const newsAPI =response.data.value[articleID];
           // console.log(newsAPI);
            res.render('newsSingle', { article : newsAPI}) 
        }).catch(function (error) {
            console.error(error);
        });
       /* const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/${articleID}`)
        res.render('newsSingle', { article : newsAPI.data })
        */
    } catch (err) {
        if(err.response) {
            res.render('newsSingle', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSingle', { article : null })
            console.log(err.requiest)
        } else {
            res.render('newsSingle', { article : null })
            console.error('Error', err.message)
        }
    } 
});


newsRouter.post('', async(req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts?search=${search}`)
        res.render('newsSearch', { articles : newsAPI.data })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})


module.exports = newsRouter 