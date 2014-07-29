/**
 * 
 */

function test(str) {
	return str + " ** ";
}

function Rect(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

function rectToString(rect) {
	return "(" + rect.x + ", " + rect.y + ", " + rect.width + ", " + rect.height + ")";
}

function Image(rect, id) {
	console.log("image init ");
	console.log(rect);
	this.width = rect.width;
	this.height = rect.height;
	this.id = id;
	this.getWidth = getWidth;
}

function getWidth() {
	return this.width;
}

function Node(rect) {
	this.left = null;
	this.right = null;
	this.rect = rect;
	this.leaf = true;
	this.imageId = -1;
}

function nodeToString(node) {
	return rectToString(node.rect) + " id:" + node.imageId; 
}

function filled(node) {
	return node.imageId != -1;
}

function branchVertically(node, w) {
	console.log("podjeli vertikalno");
	node.leaf = false;
	node.left = new Node(new Rect(node.rect.x, node.rect.y, w, node.rect.height));
	node.right = new Node(new Rect(node.rect.x + w, node.rect.y, node.rect.width - w, node.rect.height));
}

function branchHorizontally(n, h) {
	console.log("podjeli horizontalno");
	console.log("h = %d", h);
	n.leaf = false;
	n.left = new Node(new Rect(n.rect.x, n.rect.y, n.rect.width, h));
	n.right = new Node(new Rect(n.rect.x, n.rect.y + h, n.rect.width, n.rect.height - h));
}

function isSmall(node, img) {
	if (node.rect.width < img.width)
		return true;
	if (node.rect.height < img.height)
		return true;
	return false;
}

function fittsPerfect(node, img) {
	return (node.rect.width == img.width && node.rect.height == img.height);
}

function insert(node, img) {
	console.log("insert img into node");
	console.log(node);
	if (!node.leaf) {
		console.log("- not leaf -");
		newNode = insert(node.left, img);
		if (newNode != null) return newNode;
		else return insert(node.right, img);
	}
	else {
		console.log("- leaf -");
		if (filled(node)) return null;
		if (isSmall(node, img)) return null;
		if (fittsPerfect(node, img)) {
			console.log("fitts perfect");
			console.log(node.rect);
			node.imageId = img.id;
			node.leaf = true;
			return node;
		}
		dw = node.rect.width - img.width;
		dh = node.rect.height - img.height;
		console.log("img : %d %d", img.getWidth(), img.height);
		if (dw > dh) branchVertically(node, img.width);
		else branchHorizontally(node, img.height);
		console.log("inset into left node");
		return insert(node.left, img);
	}
}





