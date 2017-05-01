export function getPrefixUrl() {
    return "http://localhost:3003"
}

export function getA2ZArray() {
    let A2Z = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
    return A2Z.split(",");
}

export function getCursorPos(input) {
    if ("selectionStart" in input && document.activeElement == input) {
        return {
            start: input.selectionStart,
            end: input.selectionEnd
        };
    }
    else if (input.createTextRange) {
        let sel = document.selection.createRange();
        if (sel.parentElement() === input) {
            let rng = input.createTextRange();
            rng.moveToBookmark(sel.getBookmark());
            let len;
            for (len = 0;
                 rng.compareEndPoints("EndToStart", rng) > 0;
                 rng.moveEnd("character", -1)) {
                len++;
            }
            rng.setEndPoint("StartToStart", input.createTextRange());
            let pos;
            for (pos = {start: 0, end: len};
                 rng.compareEndPoints("EndToStart", rng) > 0;
                 rng.moveEnd("character", -1)) {
                pos.start++;
                pos.end++;
            }
            return pos;
        }
    }
    return -1;
}

export function setCursorPos(input, start, end){
    if (arguments.length < 3) end = start;
    if ("selectionStart" in input) {
        setTimeout(function () {
            input.selectionStart = start;
            input.selectionEnd = end;
        }, 1);
    }
    else if (input.createTextRange) {
        let rng = input.createTextRange();
        rng.moveStart("character", start);
        rng.collapse();
        rng.moveEnd("character", end - start);
        rng.select();
    }
}

export const conf = {
    questionType: [
        {
            englishName: 'singleChoice',
            chineseName: '单选题'
        },
        {
            englishName: 'multipleChoice',
            chineseName: '多选题'
        },
        {
            englishName: 'judgment',
            chineseName: '判断题'
        },
        {
            englishName: 'fillBlank',
            chineseName: '填空题'
        },
        {
            englishName: 'subjectiveQuestions',
            chineseName: '简答题'
        }
    ]
};