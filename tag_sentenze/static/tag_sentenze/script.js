// JQuery code

// $(document).ready(function() {
//     autosize($('textarea'));
    
//     var csrf = $("input[name=csrfmiddlewaretoken]").val()

//     $(".btn").click(function () {
//         var sel_text = "";
//         var txtarea = document.getElementById("visualizer_area");
//         var start = txtarea.selectionStart;
//         var end = txtarea.selectionEnd;
//         sel_text = txtarea.value.substring(start, end);

//         alert(start+" "+ end+" "+sel_text)
        

//         // BACKEND
//         // // chiamata python con AJAX
//         // $.ajax({
//             //     url: "{% url 'tag_sentenze:new-tag' nome_s %}",
//             //     type: 'post',
//         //     data: {
//         //         tag: $(this).text(), 
//         //         non_tagged_text: sel.toString(),
//         //         csrfmiddlewaretoken: csrf
//         //     },
//         //     success: function (response) {
//         //         //console.log(response);
//         //         document.querySelector("#sentenza").innerHTML = response.response.toString();
//         //     },
//         //     error: function (response) {
//         //         // alert the error if any error occured
//         //         alert(response["responseJSON"]["error"]);
//         //     }
//         // })
//         // .then(() => sel.empty());
                
        
//         //alert("invio")
//         // let sel = document.getSelection();
//         // if (sel.isCollapsed) {
//         //     return;
//         // }

//         // let start = sel.anchorOffset;
//         // let end = sel.focusOffset;
//         // alert(start + " " + end);
//         // console.log(sel.anchorNode);
//         // console.log(sel.focusNode);
//     });

// });

const Counter = {
    delimiters : ["[[", "]]"],
    data() {
        return {
        counter: 0
        }
    },
    mounted() {
        setInterval(() => {
        this.counter++
        }, 1000)
    }
}

Vue.createApp(Counter).mount('#counter')