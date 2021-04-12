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


const Counter = Vue.createApp({
    delimiters : ["[[", "]]"],
    data() {
        return {
            x: 0,
            firstName: 'Alberto',
            lastName: 'Zerbinati',
            message: 'questo è un title',
            sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]

        }
    },
    mounted() {
        setInterval(() => {
        this.x++
        }, 1000)
    },
    methods: {
        alert() {
            alert("haloo")
        },
        even(numbers) {
            return numbers.filter(number => number % 2 === 0)
        }
    },
    computed: {
        fullName: {
            // getter
            get() {
                return this.firstName + ' ' + this.lastName
            },
            // setter
            set(newValue) {
                const names = newValue.split(' ')
                this.firstName = names[0]
                this.lastName = names[names.length - 1]
            }
        }
    }
})

//const vm = Counter.mount('#counter');

//vm.fullName = "Simone Zerbinati";