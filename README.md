> ## Website Performance Optimization portfolio project
>
> Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).
> 
> To get started, check out the repository and inspect the code.
> 
> ### Getting started
> 
> #### Part 1: Optimize PageSpeed Insights score for index.html
> 
> Some useful tips to help you get started:
> 
> 1. Check out the repository
> 1. To inspect the site on your phone, you can run a local server
> 
>   ```bash
>   $> cd /path/to/your-project-folder
>   $> python -m SimpleHTTPServer 8080
>   ```
> 
> 1. Open a browser and visit localhost:8080
> 1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.
> 
>   ``` bash
>   $> cd /path/to/your-project-folder
>   $> ./ngrok http 8080
>   ```
> 
> 1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)
> 
> Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!
> 
> #### Part 2: Optimize Frames per Second in pizza.html
> 
> To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 
> 
> You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).
> 
> ### Optimization Tips and Tricks
> * [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
> * [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
> * [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
> * [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
> * [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
> * [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
> * <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
> * <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
> * <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
> * <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>
> 
> ### Customization with Bootstrap
> The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.
> 
> * <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
> * <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>


**上面是原仓库的ReadMe，有两个题目，下面使我们的解答：**

#### Part 1: Optimize PageSpeed Insights score for index.html
1. 使用 `gulp` 
    - Minified HTML 
    - Minified CSS
    - Inlined JS and CSS
    - Uglified JS
    - compress Image
2. 手动优化的部分
    - 对 `print.css` 添加 `media` 以不阻塞 CRP(关键渲染路径)
    - 对 `analytics.js` 添加 `async` 以不阻塞 CRP(关键渲染路径)

完成后运行 `gulp` 或 `npx gulp` 以执行打包，最后将使用 `github pages` 来测试，这是[结果](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fjintangwang.github.io%2Ffrontend-nanodegree-mobile-portfolio%2Fdist%2F)。

*注： 不使用原项目里说的 [ngrok](https://ngrok.com/)，因为它代理的网页加载速度太慢了，影响分数太大了。*

目前还有的问题：

- `<link href="//fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">` 还阻塞着 CRP
- 压缩后的图片还是有点大

#### Part 2: Optimize Frames per Second in pizza.html
没优化前的 `log` （在 `main.js` 的 493 行有个 `log` 用来监测每帧的时间）:
```text
main.js:493 Average scripting time to generate last 10 frames: 119.19449996203184ms
main.js:493 Average scripting time to generate last 10 frames: 128.6314999917522ms
main.js:493 Average scripting time to generate last 10 frames: 128.79350003786385ms
```

1. `updatePositions()`: 
    - 将 `scrollTop` 移到循环外边
    - 使用 `requestAnimationFrame`
        ```javascript
        function updatePositions() {
           frame++;
           window.performance.mark("mark_start_frame");
        
           requestAnimationFrame(function() {
             var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
             var items = document.querySelectorAll('.mover');
             for (var i = 0; i < items.length; i++) {
               var phase = Math.sin((scrollTop / 1250) + (i % 5));
               items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
             }
           });
           // ...
        }
        ```
2. `changePizzaSizes()`: 将 `document.querySelectorAll(".randomPizzaContainer")` 指定为变量，不要再循环里每次都获取一遍
3. `DOMContentLoaded` 事件监听回调中将 200 改为 30 ，因为其他随机生成的披萨已经超出了可视范围

优化后的结果：
```text
main.js:494 Average scripting time to generate last 10 frames: 0.02250000834465027ms
main.js:494 Average scripting time to generate last 10 frames: 0.018000020645558834ms
main.js:494 Average scripting time to generate last 10 frames: 0.019000028260052204ms
```

> 参考链接： [royshouvik/frontend-nanodegree-mobile-portfolio](https://github.com/royshouvik/frontend-nanodegree-mobile-portfolio)
