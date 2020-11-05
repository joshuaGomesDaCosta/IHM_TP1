

class Page extends React.Component {
    // Moving objects initialization
    let t = 0

    // Game initialization
    const game = new Game([v1, v2, v3, r1, r2, r3]);
    setInterval(() => {
        // TODO: implement the state loop
        t += tick;
        game.move();
    }, tick);

    // Renderer initialization
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    let renderer = new Renderer(game, context);


    let render = () => {
        // TODO: implement the rendering loop
        renderer.render();
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
      }
      
    return <Canvas draw={draw} />
}

export default Page;