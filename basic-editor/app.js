let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");

let FontName = document.getElementById("fontName");
let FontSizeref = document.getElementById("Font-size");
let writtingArea = document.getElementById("text-input");

let LinkButton = document.getElementById("createLink");
let alignButttons = document.querySelectorAll(".align");

let SpaceButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");


// List Of fontlist

let fontlist = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];


// initial Setting
const initializer = () => {
    //  function calls for highlight buttons
    // no highlight for link,unlink,lists.redo,undo since they are one  time operations
    highlighter(alignButttons, true);
    highlighter(SpaceButtons, true);
    highlighter(formatButtons,false);
    highlighter(scriptButtons,true);


    //  create options for font names

    fontlist.map(value => {
        let option = document.createElement("option");
        Option.value = value;
        option.innerHTML = value;
        FontName.appendChild(option);
    });


      // fontsize allows only till 7
      
      for(let i =1; i<=7; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        FontSizeref.append(option);
      };

    //      default size
    FontSizeref.value = 3;




};



//    main logic
const modifyText = (command,defaultUi,value) =>{
    // command selected text
    document.execCommand(command, defaultUi, value);
};

//  basic operations which command dont need value parameter

optionsButtons.forEach(button =>{
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);

    });
});

// options that require value parameter (e.g color, fonts)
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id,false, button.value);
    });
});

// Link

LinkButton.addEventListener("click", () =>{
    let userLink = prompt("Enter a URL");
    // link has http then pass directly else
    if(/http/i.test(userLink)){
        modifyText(LinkButton.id,false,userLink);
    }
    else{
        userLink = "http://" + userLink;
        modifyText(LinkButton.id,false,userLink);
    }
});

// Highlight clicked buttons
const highlighter = (className, needsRemovall) => {
    className.forEach((button) => {
        button.add.EventListener("click", () => {
            // needsRemovall = true means only one button should be highlight and other would be normal
            if(needsRemovall){
                let alreadyActive = false;

                // if currently clicked button  is alreadyactive
                if(button.classList.contains("active")){
                    alreadyActive = true;
                }


                // remove highlight from other buttons
                highlighterRemover(className);
                if(!alreadyActive){
                    // highlight clicked button 
                    button.classList.add("active");
                }
            }
            else{
                // if other button highlight
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button)=> {
        button.classList.remove("active");
    });
};


