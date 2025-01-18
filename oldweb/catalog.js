function reportPost(postId) {
   
    const postCard = document.getElementById(postId);

    
    postCard.innerHTML = `
      <div class="reported">
        <!-- Main content -->
        <div class="reported-content">
          <p style="color: red;">Post Reported</p>
          <button class="undo-button" onclick="undoReport('${postId}')">Undo</button>
        </div>
        <!-- Flag -->
        <div class="reported-flag">
          <img src="images/redflag.png" alt="Red Flag button" onclick="undoReport('${postId}')">
        </div>
      </div>
    `;
}

function undoReport(postId) {
    
    const postCard = document.getElementById(postId);

    if (postId === 'post-card-1') {
        postCard.innerHTML = `
          <img src="images/hm.png" alt="H&M Outfit">
          <div class="info">
            <div class="brandName">H&M</div>
            <button class="shop-button">Shop</button>
          </div>
          <img src="images/flag.png" class="flag-button" alt="Flag button" onclick="reportPost('${postId}')">
        `;
    } else if (postId === 'post-card-2') {
        postCard.innerHTML = `
          <img src="images/bananaRepublic.png" alt="Banana Republic Outfit">
          <div class="info">
            <div class="brandName">Banana Republic</div>
            <button class="shop-button">Shop</button>
          </div>
          <img src="images/flag.png" class="flag-button" alt="Flag button" onclick="reportPost('${postId}')">
        `;
    }
}

