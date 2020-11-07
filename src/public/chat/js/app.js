$(function () {
  $(".heading-compose").on("click", function () {
    $(".side-two").css({
      left: "0",
    });
  });

  $(".newMessage-back").on("click", function () {
    $(".side-two").css({
      left: "-100%",
    });
  });
});

const socket = io();
const RECEIVER_MESSAGE = "RECEIVER_MESSAGE";
const GET_MESSAGE = "GET_MESSAGE";
const NEW_MESSAGE = "NEW_MESSAGE";
const RECIEVER_NEW_MESSAGE = "RECIEVER_NEW_MESSAGE";
const START_CONVERSATION = "START_CONVERSATION";
const START_CONVERSATION_SUCCESS = "START_CONVERSATION_SUCCESS";
const conversationElement = $("#conversation");
const inputElement = $("#comment");
const roomSideBar = $(".side-one .sideBar");

function scrollEndChat() {}

function renderShowMoremessage() {
  html = `<div class="row message-previous">
              <div class="col-sm-12 previous">
                <a href="#" class="show-more-message">
                  Xem tin nhắn cũ hơn!
                </a>
              </div>
            </div>`;
  conversationElement.prepend(html);
}

function renderMessage(mess, append = true) {
  const isSend = current_user_id === mess.author_id;

  const html = `
    <div class="row message-body">
      <div class="col-sm-12 ${
        isSend ? "message-main-sender" : "message-main-receiver"
      }">
        <div class="${isSend ? "sender" : "receiver"}">
          <div class="message-text">${mess.body}</div>
          <span class="message-time pull-right"> Sun </span>
        </div>
      </div>
    </div>`;

  if (append) {
    conversationElement.append(html);
  }
  if (!append) {
    conversationElement.prepend(html);
  }
}

function renderRoom(room) {
  const html = `<div class="row sideBar-body" id="room-${room._id}">
  <div class="col-sm-3 col-xs-3 sideBar-avatar">
    <div class="avatar-icon">
      <img src="img/avatar1.png" />
    </div>
  </div>
  <div class="col-sm-9 col-xs-9 sideBar-main">
    <div class="row">
      <div class="col-sm-8 col-xs-8 sideBar-name">
          <span class="name-meta">
            ${
              room.name
                ? room.name
                : room.users
                    .filter((u) => u._id !== current_user_id)
                    .map((u) => u.full_name)
                    .join(",")
            }
          </span>
      </div>
    </div>
  </div>
</div>`;
  roomSideBar.prepend(html);
}

function newMessage(body) {
  socket.emit(NEW_MESSAGE, {
    authorID: current_user_id,
    roomID: current_room_id,
    body,
  });
  inputElement.val("");
}

function getMessage(page = 1) {
  if (current_room_id) {
    socket.emit(GET_MESSAGE, { roomID: current_room_id, page });
  }
}

function receiveMessage(data) {
  if (data.messages && data.messages.length) {
    for (let mess of data.messages) {
      renderMessage(mess, false);
    }
    renderShowMoremessage();
  }
}
function startConversation(data) {
  socket.emit(START_CONVERSATION, data);
}

function boot() {
  socket.on(RECEIVER_MESSAGE, receiveMessage);
  socket.on(RECIEVER_NEW_MESSAGE, function ({ mess }) {
    if (mess && mess.room_id === current_room_id) {
      renderMessage(mess);
    } else {
      $(`#room-${mess.room_id}`).find(".name-meta").css({ fontWeight: 600 });
    }
  });
  socket.on(START_CONVERSATION_SUCCESS, function ({ room }) {
    if (room) {
      current_room_id = room._id;
      conversationElement.empty();
      getMessage();
      $(".side-one").find(".active").removeClass("active");
      if (!$(`#room-${room._id}`).length) {
        renderRoom(room);
      }
      $(`#room-${room._id}`).addClass("active");
    }
  });
  inputElement.on("keyup", function (e) {
    const val = inputElement.val();
    if (e.keyCode === 13) {
      if (e.shiftKey) {
        inputElement.val(val + "\n");
        e.stopPropagation();
      } else if (val) {
        newMessage(val.trim());
      }
    }
  });
  $(document).on("click", ".sideBar-body", function (e) {
    const idStr = $(this).attr("id");
    const [type, id] = idStr.split("-");
    startConversation({ type, id });
    $(".newMessage-back").click();
  });
  $(document).on("click", ".side-one .sideBar-body", function (e) {
    $(this).find(".name-meta").css({ fontWeight: 100 });
  });
  if (current_room_id) {
    startConversation({ type: "room", id: current_room_id });
  }
}

boot();
