const socket = io('https://my-firstchat.herokuapp.com/')

let message = document.getElementById('message')
let form_send = document.getElementById('form_message')
let inputmessage = document.getElementById('input_message')


form_send.addEventListener('submit',(e)=>{
    e.preventDefault();
    // console.log(inputmessage.value);
    // let new_msg = document.createElement('div')
    // new_msg.innerText=inputmessage.value;
    // new_msg.classList.add('msg_cotainer')
    // message.append(new_msg)  
    // socket.emit('send',inputmessage.value)
    // inputmessage.value='';


    let div = document.createElement('div')
    div.classList.add('d-flex','justify-content-start','mb-4')
    let inner_div = document.createElement('div')
    inner_div.classList.add('msg_cotainer')
    inner_div.innerText='you: '+ inputmessage.value
    div.append(inner_div)
    message.append(div)
    socket.emit('send',inputmessage.value)
    inputmessage.value='';
})


let name;
do {
    name = prompt('Enter your name to  join chat')
} while (!name);


socket.emit('new_user_joined' ,name)

socket.on('user_joined',name=>{
    console.log(name)
    new_user_joined(name)
})



function new_user_joined(name){
    // let p =document.createElement('p')
    // p.classList.add('right_text')
    // p.innerText=name
    // message.append(p)


    let div = document.createElement('div')
    div.classList.add('d-flex','justify-content-end','mb-4')
    let inner_div = document.createElement('div')
    inner_div.classList.add('msg_cotainer_send')
    inner_div.innerText=name
    div.append(inner_div)
    message.append(div)
    // socket.emit('send',inputmessage.value)
    // inputmessage.value='';

}


function messages(new_message,user_name){
    // let p =document.createElement('p')
    // p.classList.add('right_text')
    // p.innerText= `${user_name} : ${new_message}`
    // message.append(p)

    let div = document.createElement('div')
    div.classList.add('d-flex','justify-content-end','mb-4')
    let inner_div = document.createElement('div')
    inner_div.classList.add('msg_cotainer_send')
    inner_div.innerText=`${user_name} : ${new_message}`
    div.append(inner_div)
    message.append(div)
}



socket.on('receive',(message)=>{
    console.log(message.message)
    console.log(message.user)
    messages(message.message,message.user)
})

socket.on('leave' , message=>{
    messages('left the chat',message.message)
})