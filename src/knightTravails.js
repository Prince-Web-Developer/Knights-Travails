const knightsTravails = (() => {
  const arr = new Array(64);



  function knightsTravailsInner(start, end,quene = [],parent = null,path = []) {
    if (start[0] === end[0] && start[1] === end[1]) {
      path.push(start)
      return parent
    }

    const index = getNumericIndex(start)
    const nextValidMoves = getNextValidMoves(start);
    nextValidMoves.forEach((validMove) => {
      quene.push({current:validMove,parent:start})
    })
    
    arr[index] = true;

    const nextMove = quene.shift()

    const result = knightsTravailsInner(nextMove.current, end, quene, nextMove.parent, path)
    

    if (parent === null) {
      path.unshift(start)
      return path
    }

    if (result === start) {
      path.unshift(start)
      return parent
    }
    return result
  }



  function getNumericIndex(current) {
    return current[0] * 7 + (current[0] + current[1]);
  }

  function getNextValidMoves(current) {
    let [currentX, cuurentY] = current;
    const validMoves = []


    const variations = [
      [-2, -1],
      [2, 1],
      [1, 2],[-2, +1],
      [1, -2],
      [2, -1],
      [-1, 2],
      [-1, -2],
    ];
    

    variations.forEach((variation) => {
      const newX = currentX + variation[0]
      const newY = cuurentY + variation[1]

      const numericIndex = getNumericIndex([newX,newY])
      if ((newX >= 0 && newX <= 7) && (newY >= 0 && newY <= 7) && arr[numericIndex] !== true) validMoves.push([newX,newY])
    })
    
    return validMoves
  
  }


  function knightsTravails(current, destination) {
    arr.fill(false)
    const result = knightsTravailsInner(current, destination)
    
    console.log(`You Made in ${result.length - 1} moves`);
    result.forEach((e) => {
      console.log(e);
    })
  }

  return knightsTravails;
})();



knightsTravails([3,3],[0,0]);

export { knightsTravails };
