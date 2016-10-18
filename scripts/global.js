let isMenuOpen = false;
let isNewThreadOpen = false;

let monthsArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

let users = [
    {name: "Satya Vaswani", color: "#4999ce"},
    {name: "Reinhardt Wilhelm", color: "#a6a0b8"},
    {name: "Hana Song", color: "#ee9dea"},
    {name: "Hanzo Shimada", color: "#52443b", threads: [4114]}
];
let threads =[
    {
        id: 2324,
        rank: 13,
        rankStatus: "nun",
        color: "",
        date: "Oct 01, 2016. 21:22",
        user: users[0],
        title: "teleport online, i have open the path",
        link: "https://www.youtube.com/watch?v=ivl_f4dUBw4",
        commentsNum: 42
    },
    {
        id: 131,
        rank: 7,
        rankStatus: "nun",
        date: "Sep 29, 2016. 12:47",
        user: users[1],
        title: "Hammer Down!!",
        link: "https://www.youtube.com/watch?v=bVRyCQvPiSQ",
        commentsNum: 14
    },
    {
        id: 9682,
        rank: 4,
        rankStatus: "nun",
        date: "sep 26, 2016. 17:12",
        user: users[2],
        title: "Nerf This!",
        link: "https://www.youtube.com/watch?v=p56oIQiDxbQ",
        commentsNum: 37
    },
    {
        id: 4114,
        rank: 2,
        rankStatus: "nun",
        date: "sep 26, 2016. 17:12",
        user: users[3],
        title: "let the dragon consume you",
        link: "https://www.youtube.com/watch?v=TQoPovCutZw",
        commentsNum: 2
    }
];

//render new threads
const renderThreads = () =>{
    threadContainer.innerHTML = "";
    threads.forEach((item) => {
        renderNewThread(item);
    });
};

const renderNewThread = (item) =>{
    const threadContainer = document.getElementById('threadContainer');
    threadContainer.innerHTML +=  "<div class='thread-box'>"+
        "<div class='thread-box-rank'>"+
        "<div><i class='fa fa-caret-up' id='rankUp"+ item.id +"' onclick='voteRank("+ item.id +",true)'></i></div>"+
        "<div id='rank"+ item.id +"'>"+ item.rank +"</div>"+
        "<div><i class='fa fa-caret-down' id='rankDown"+ item.id +"' onclick='voteRank("+ item.id +",false)'></i></div>"+
        "</div>"+
        "<div class='thread-box-icon'><div id='userColor1"+ item.id +"' style='background-color: "+ item.user.color +"'></div></div>"+
        " <div class='thread-box-body'>"+
        "<div class='thread-box-body-link'><a href='"+ item.link +"'>"+ item.title +"</a></div>"+
        "<div class='thread-box-body-info'>submitted "+ item.date +", by <span id='userColor2"+ item.id +"' style='color: "+ item.user.color +"'>"+ item.user.name +"</span></div>"+
        "<div class='thread-box-body-share'>"+ item.commentsNum +" <span class='fa fa-comment'></span> Share</div>"+
        "</div>"+
        "</div>";
};

//change rank number
const voteRank = (id, isVoteUp) => {
    let activeRankId = threads.find((item) => item.id === id); //return the correct object to change
    let rankUpA = document.getElementById( "rankUp"+ id ); //get active up arrow and change it
    let rankDwonA = document.getElementById( "rankDown"+ id ); //get active down arrow and change it
    if (isVoteUp){//if user press up
        if (activeRankId.rankStatus === "nun"){
            activeRankId.rank++;
            activeRankId.rankStatus = "up";
            rankUpA.style.color = "#5e485b";
        }
        else if(activeRankId.rankStatus === "down"){
            activeRankId.rank += 2;
            activeRankId.rankStatus = "up";
            rankUpA.style.color = "#5e485b";
            rankDwonA.style.color = "#7b7b7b";
        }
        else{
            activeRankId.rankStatus = "nun";
            activeRankId.rank--;
            rankUpA.style.color = "#7b7b7b";
        }

  } else { //if user press down
        if (activeRankId.rankStatus === "nun"){
            activeRankId.rank--;
            activeRankId.rankStatus = "down";
            rankDwonA.style.color = "#5e485b";
        }
        else if(activeRankId.rankStatus === "up"){
            activeRankId.rank -= 2;
            activeRankId.rankStatus = "down";
            rankUpA.style.color = "#7b7b7b";
            rankDwonA.style.color = "#5e485b";
        }
        else{
            activeRankId.rankStatus = "nun";
            activeRankId.rank++;
            rankDwonA.style.color = "#7b7b7b";
        }
    }
    let rankNum = document.getElementById( "rank"+ id ); //get active num and change it
    rankNum.innerHTML = activeRankId.rank;
};

//add new thread
const addNewThread = () =>{
  let newTilte = document.getElementById('newThreadTitle');
  let newLink = document.getElementById('newThreadLink');
    let newDate = new Date();
    let month = newDate.getMonth();
    let day = newDate.getDate();
    let year = newDate.getFullYear();
    let newID = Math.floor((Math.random() * 25000) + 1);
    if(newTilte.value != "" && newLink.value != ""){
        const item = {
            id: newID,
            rank: 0,
            rankStatus: "nun",
            date: monthsArray[month] + " " + day + ", " + year,
            user: users[3],
            title: newTilte.value,
            link: newLink.value,
            commentsNum: 0
        };
        users[3].threads.push(newID);
        threads.push(item); //push new object to threads array
        newTilte.value = "";
        newLink.value = "";
        formDropDown('threadForm');
        renderNewThread(item);
    }else{
        if(newTilte.value === ""){newTilte.style.cssText = 'border: 2px solid #FF0000;'}
        if(newLink.value === ""){newLink.style.cssText = 'border: 2px solid #FF0000;'}
    }
};

//change the color back if input haz and error
const changeInputColor = (item) =>{
    item.style.cssText = 'border: 1px solid #947190;';
};

//toggle sub title
const menuDropDown = () =>{
    let mainHeader = document.getElementById('mainHeader');
    if(isMenuOpen){
        mainHeader.innerHTML = '';
        isMenuOpen = false;
    } else{
        mainHeader.innerHTML = 'A Purple Reddit';
        isMenuOpen = true;
    }
};

//open the new thread menu
const formDropDown = (obj) =>{
  let threadForm = document.getElementById(obj);
  let userInput = document.getElementById('userName');
    userInput.value = users[3].name;
  let userColor = document.getElementById('UserColor');
    userColor.value = users[3].color;
    if(isNewThreadOpen){
        threadForm.style.cssText = '-webkit-transition: height 0.5s;transition: height 0.5s;height: 0px;';
        isNewThreadOpen = false;
    }else{
        threadForm.style.cssText = '-webkit-transition: height 0.5s;transition: height 0.5s;height: 130px;';
        isNewThreadOpen = true;
    }
};

//Change user Info
const changeUserInfo = () =>{
    let userInput = document.getElementById('userName');
    let userColor = document.getElementById('UserColor');

    if(userInput.value != "" && userColor.value != "") {
        users[3].name = userInput.value;
        users[3].color = userColor.value;

        users[3].threads.forEach((id) => {
            let userColor1 = document.getElementById("userColor1" + id);
            let userColor2 = document.getElementById("userColor2" + id);
            userColor1.style.backgroundColor = userColor.value;
            userColor2.style.color = userColor.value;
            userColor2.innerHTML = userInput.value;
        });
        formDropDown('userForm');
    }else{
    if(userInput.value === ""){userInput.style.cssText = 'border: 2px solid #FF0000;'}
    if(userColor.value === ""){userColor.style.cssText = 'border: 2px solid #FF0000;'}
    }
};