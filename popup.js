document.getElementById('detect').onclick = function() {
    chrome.tabs.executeScript({
        code: '(' + function() {
            var content = document.body.innerText;
            var pattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
            var matches = content.match(pattern);
            var uniqueEmails = [...new Set(matches)];
            return uniqueEmails;
        } + ')();'
    }, function(results) {
        var csvContent = 'data:text/csv;charset=utf-8,' + results[0].join('\n');
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'emails.csv');
        document.body.appendChild(link);
        link.click();
    });
};
