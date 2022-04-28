
let V = 9;

function minDistance(dist,shortestPath)
{
	
	// Initialize min value
	let min = Number.MAX_VALUE;
	let minPathIndex = -1;
	
	for(let v = 0; v < V; v++)
	{
		if (shortestPath[v] == false && dist[v] <= min)
		{
			min = dist[v];
			minPathIndex = v;
		}
	}
	return minPathIndex;
}

// A utility function to print
// the constructed distance array
function printSolution(dist, previous)
{

	console.log("Vertex \t\t Distance from Source \t\t Previous");
	for(let i = 0; i < V; i++)
	{
		console.log(i + " \t\t " +
				dist[i] + " \t\t\t\t " + previous[i]);
	}
}

// Function that implements Dijkstra's
// single source shortest path algorithm
// for a graph represented using adjacency
// matrix representation
function dijkstra(graph, src)
{
	let dist = new Array(V);
	let shortestPath = new Array(V);
	let previous = new Array(V);
	
	// Initialize all distances as
	// INFINITE and stpSet[] as false
	for(let i = 0; i < V; i++)
	{
		dist[i] = Number.MAX_VALUE;
		shortestPath[i] = false;
	}
	
	// Distance of source vertex
	// from itself is always 0
	dist[src] = 0;
	
	// Find shortest path for all vertices
	for(let count = 0; count < V - 1; count++)
	{
		
		// Pick the minimum distance vertex
		// from the set of vertices not yet
		// processed. u is always equal to
		// src in first iteration.
		let u = minDistance(dist, shortestPath);
		
		// Mark the picked vertex as processed
		shortestPath[u] = true;
		
		// Update dist value of the adjacent
		// vertices of the picked vertex.
		for(let v = 0; v < V; v++)
		{
			
			// Update dist[v] only if is not in
			// shortestPath, there is an edge from u
			// to v, and total weight of path
			// from src to v through u is smaller
			// than current value of dist[v]
			if (!shortestPath[v] && graph[u][v] != 0 &&
				dist[u] != Number.MAX_VALUE &&
				dist[u] + graph[u][v] < dist[v])
			{
				previous[v] = u;
				dist[v] = dist[u] + graph[u][v];
			}
		}
	}
	
	// Print the constructed distance array
	printSolution(dist, previous);
}

// Driver code
let graph = [ [ 0, 4, 0, 0, 0, 0, 0, 8, 0 ],
			[ 4, 0, 8, 0, 0, 0, 0, 11, 0 ],
			[ 0, 8, 0, 7, 0, 4, 0, 0, 2 ],
			[ 0, 0, 7, 0, 9, 14, 0, 0, 0],
			[ 0, 0, 0, 9, 0, 10, 0, 0, 0 ],
			[ 0, 0, 4, 14, 10, 0, 2, 0, 0],
			[ 0, 0, 0, 0, 0, 2, 0, 1, 6 ],
			[ 8, 11, 0, 0, 0, 0, 1, 0, 7 ],
			[ 0, 0, 2, 0, 0, 0, 6, 7, 0 ] ]
dijkstra(graph, 0);

// This code is contributed by rag2127
