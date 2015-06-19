IM.Templates = {};
IM.Templates.TabView = '<div class="{EXT} tab-view"><ul class="{EXT} tabs"></ul><ul class="{EXT} views"></ul></div>'.replace(/{EXT}/g, IM.name);
IM.Templates.Tab = '<li class="{EXT} tab">{NAME}</li>'.replace(/{EXT}/g, IM.name);
IM.Templates.View = '<li class="{EXT} view"></li>'.replace(/{EXT}/g, IM.name);
IM.Templates.Place = '<li class="{EXT} place" data-coord="{COORD}" data-name="{NAME}" data-id="{ID}">{NAME}</li>'.replace(/{EXT}/g, IM.name);