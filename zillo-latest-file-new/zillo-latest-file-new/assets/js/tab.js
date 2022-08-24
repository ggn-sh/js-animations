tabContants = document.getElementsByClassName('tabcontent');
for (i = 0; i < tabContants.length; i++) {
    if (i > 0) {
        tabContants[i].style.display = "none";
    }
}

//contant change on mouse wheel scoller
let defaultScaleval = 0;
let currentScale = 0;
let lastScale = 0;
const el = document.getElementById("main-area");
el.onwheel = wheelSlide;

function wheelSlide(event) {
    // if (event.deltaY > 0) {
    //then code excute
    // }
    currentScale += event.deltaY;
    if (currentScale < 0) {
        currentScale = 1;
        return false;
    }
    let getNextSibling = '';
    if (lastScale > currentScale) {
        //get sibling by new custom class
        getNextSibling = $('.custom-active').prev('.tabcontent'); //get prev tabcontant if want to see prev
    }
    if (lastScale < currentScale) {
        getNextSibling = $('.custom-active').nextAll('.tabcontent:first') //get next tabcontant if want to see next
    }
    if (getNextSibling.length == 0) {
        return false;
    }
    let nextSiblingId = getNextSibling[0].id; //user scroll for down contant then get next id or user scroll for upper contant prev contant get prev id (same for hiding or showing mutation function)
    var tabcontent = $(".custom-active"); //current showing tabcontant
    let transformText = tabcontent[0].getElementsByClassName("text-transformation");
    if (transformText.length > 0) { //if text-transformation class exist in current showing content
        var i = 0; //  set your counter to 1
        function hideTransformationLoop() {
            setTimeout(function() {
                    transformText[i].style = "opacity: 0; transform: translate3d(0px, -50px, 0px)"; //hide next contant with animation
                    i++; //  increment the counter
                    if (i < transformText.length) { //  if the counter < transformText.length, call the loop function
                        hideTransformationLoop(); //  ..  again which will trigger another 
                    }
                }, 100) //setTimeout()
        }
        hideTransformationLoop(); //  start the loop
        const hidingContantArea = document.querySelector("#" + tabcontent[0].id); //observer hideing area element
        // start muation observer for hide
        var showMutionRunTime = 0;
        mutationObserverForHide(hidingContantArea, nextSiblingId, transformText);
        // start muation observer for show
        mutationObserverForShow(nextSiblingId);
        //intilize mutation function for hide contant
        function mutationObserverForHide(parentEleHidingArea, HideNextSiblingId, hideTransformText) {
            observeCount = 0;
            const mutationObserverOnHide = new MutationObserver(entries => { //code excute when observe any change in hide contant
                observeCount += entries.length;
                if (observeCount == hideTransformText.length) {
                    setTimeout(function() {
                        tabcontent.css({ display: "none" }); //hide old contant
                        $('.tablinks.active').removeClass('active'); //remove active from nav tablink
                        var elems = document.querySelectorAll(".tabcontent.custom-active"); //get custom-active class from all elements
                        [].forEach.call(elems, function(els) { //remove custom-active class from all elements
                            els.classList.remove("custom-active");
                        });
                        setTimeout(function() {
                            $('#' + HideNextSiblingId).css({ display: "block" });
                            $('#' + HideNextSiblingId).addClass('custom-active'); //add acustom active class on current showing div
                            let navBarPointId = HideNextSiblingId.replace('_con', '') //add active class of match nav point
                            $('#' + navBarPointId).addClass('active');
                        }, 1000);
                        lastScale = currentScale;
                    }, 500);
                }
            });
        }
        //close muation observer for hide

        //intilize mutation function for show contant
        function mutationObserverForShow(showNextSiblingId) {
            const mutationObserverOnShow = new MutationObserver(showingAreaentries => { //code excute when observe any change in show contant
                if (paraentEleShowingArea.classList.contains("custom-active")) {
                    let transformationValues = paraentEleShowingArea.getElementsByClassName("text-transformation");
                    var showingi = 0; //  set your counter to 1
                    function showingTransformationLoop() {
                        setTimeout(function() {
                                transformationValues[showingi].style = "opacity: 1; transform: translate3d(0px, 0px, 0px)"; //hide next contant with animation
                                showingi++; //  increment the counter
                                if (showingi < transformationValues.length) { //  if the counter < transformText.length, call the loop function
                                    showingTransformationLoop(); //  ..  again which will trigger another 
                                }
                            }, 80) //setTimeout()
                    }
                    showingTransformationLoop(); //  start the loop
                }
            });
            const paraentEleShowingArea = document.querySelector("#" + showNextSiblingId); //observer showing area element
            mutationObserverOnShow.observe(paraentEleShowingArea, {
                attributeFilter: ["class"],
                subtree: true,
                attributes: true,
                attributeOldValue: true
            });
        }
        //close muation observer for show
    }
}